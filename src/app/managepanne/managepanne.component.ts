import { PanneComponent } from './panne.component';
import { ManagePanneService } from './managepanne.service';
import { Component,OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Panne, TypePanne} from './managepanne';

import { formatDate, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ConfirmEventType, ConfirmationService, LazyLoadEvent, Message, MessageService,PrimeNGConfig } from 'primeng/api';

import { TranslateService  } from '@ngx-translate/core';
import { Observable,forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-managepanne',
  templateUrl: './managepanne.component.html',
  styleUrls: ['./managepanne.component.scss'],
  providers:[ManagePanneService, MessageService, ConfirmationService, DatePipe ]
})
export class ManagePanneComponent implements OnInit, AfterViewInit {

  @ViewChild(PanneComponent) Panne;
  
  listPanne:Panne[]=[]
  loading:boolean;
  saveE:boolean
  Panneselected:Panne=new Panne();
  currentPanne:Panne=new Panne();
  newPanne:boolean=false;
  displayPanneDialog:boolean=false;
  backendmessages:Message[]=[];
  errorbackend:boolean=false;


  constructor(private config: PrimeNGConfig,private managePanneService: ManagePanneService,private messageService: MessageService,
    private confirmationService: ConfirmationService,private translateService: TranslateService,
    private datePipe: DatePipe ) { }
    //
    //
  ngOnInit(): void {
    registerLocaleData(localeFr);
    
  }

  translate(lang: string) {
  }

  getRandomInt(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ngAfterViewInit(): void {
    this.errorbackend=false;
    this.backendmessages=[]
    this.managePanneService.requestDataFromMultipleSources()
    .subscribe({
      next: (responseList) => {  
        
        this.loading=false
    },
    error:(error)=>{
      this.errorbackend=true
      this.backendmessages = [{ severity: 'error', summary: 'Error', detail: 'Impossible de contacter le serveur!! Merci de contacter le support.' }];
      
      this.loading = false
    }})
  }

  RefreshAllPanne(){
    this.loading = true;
    this.errorbackend=false;
    this.backendmessages=[]
    this.listPanne=[]
    this.managePanneService.getAllPanne()
    .subscribe({
      next: (responseList) => {  
        this.listPanne= responseList
        this.loading=false
    },
    error:(error)=>{
      //console.log(JSON.stringify("erroe" + error))
      //this.errorbackend=true
      this.errorbackend=true
      this.backendmessages = [{ severity: 'error', summary: 'Error', detail: 'Impossible de contacter le serveur!! Merci de contacter le support.' }];
      
      this.loading = false
    }})
  }

  updatesaveE(saveE:boolean) {
    if (saveE==true){
      if (this.newPanne){
        this.listPanne=[this.Panne.panne ,...this.listPanne]
      }
      else{
        Object.assign(this.currentPanne,JSON.parse(JSON.stringify(this.Panne.panne)))
      }
    this.displayPanneDialog=false;
    }
  }

  openNewPanne(){
    //this.selectedmileagecharges=new MileageChargesHeader()
    this.Panneselected=new Panne();
    
    
    this.newPanne=true;
    this.displayPanneDialog=true;
  }

  editPanne(Panne:Panne){
    this.newPanne=false;
    this.currentPanne=Panne
    this.Panneselected=Object.assign({},Panne)
    this.displayPanneDialog=true
  }
  deletePanne(panne: Panne) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cette Type Panne?',
      accept: () => {
        this.managePanneService.deletePanne(panne.id.valueOf()).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Type Panne supprimée avec succès',
            });
            
            this.RefreshAllPanne();
          },
         
        });
      },
    });
  }
}
