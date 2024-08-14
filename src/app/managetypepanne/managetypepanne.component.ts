import { TypepanneComponent } from './typepanne.component';
import { ManageTypepanneService } from './managetypepanne.service';
import { Component,OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { TypePanne} from './managetypepanne';

import { formatDate, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ConfirmEventType, ConfirmationService, LazyLoadEvent, Message, MessageService,PrimeNGConfig } from 'primeng/api';

import { TranslateService  } from '@ngx-translate/core';
import { Observable,forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-managetypepanne',
  templateUrl: './managetypepanne.component.html',
  styleUrls: ['./managetypepanne.component.scss'],
  providers:[ManageTypepanneService, MessageService, ConfirmationService, DatePipe ]
})
export class ManageTypepanneComponent implements OnInit, AfterViewInit {

  @ViewChild(TypepanneComponent) Typepanne;
  
  listTypepanne:TypePanne[]=[]
  loading:boolean;
  saveE:boolean
  Typepanneselected:TypePanne=new TypePanne();
  currentTypepanne:TypePanne=new TypePanne();
  newTypepanne:boolean=false;
  displayTypepanneDialog:boolean=false;
  backendmessages:Message[]=[];
  errorbackend:boolean=false;



  constructor(private config: PrimeNGConfig,private manageTypepanneService: ManageTypepanneService,private messageService: MessageService,
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
    this.manageTypepanneService.requestDataFromMultipleSources()
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

  RefreshAllTypepanne(){
    this.loading = true;
    this.errorbackend=false;
    this.backendmessages=[]
    this.listTypepanne=[]
    this.manageTypepanneService.getAllTypepanne()
    .subscribe({
      next: (responseList) => {  
        this.listTypepanne= responseList
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
      if (this.newTypepanne){
        this.listTypepanne=[this.Typepanne.typepanne ,...this.listTypepanne]
      }
      else{
        Object.assign(this.currentTypepanne,JSON.parse(JSON.stringify(this.Typepanne.typepanne)))
      }
    this.displayTypepanneDialog=false;
    }
  }

  openNewTypepanne(){
    //this.selectedmileagecharges=new MileageChargesHeader()
    this.Typepanneselected=new TypePanne();
    
    
    this.newTypepanne=true;
    this.displayTypepanneDialog=true;
  }

  editTypepanne(typepanne:TypePanne){
    this.newTypepanne=false;
    this.currentTypepanne=typepanne
    this.Typepanneselected=Object.assign({},typepanne)
    this.displayTypepanneDialog=true
  }
  deleteTypePanne(typepanne: TypePanne) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cette Type Panne?',
      accept: () => {
        this.manageTypepanneService.deleteTypePanne(typepanne.id.valueOf()).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Type Panne supprimée avec succès',
            });
            
            this.RefreshAllTypepanne();
          },
         
        });
      },
    });
  }
}
