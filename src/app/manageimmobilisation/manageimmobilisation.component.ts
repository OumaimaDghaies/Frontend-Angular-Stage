import { ImmobilisationComponent } from './immobilisation.component';
import { ManageImmobilisationService } from './manageimmobilisation.service';
import { Component,OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Immobilisation} from './manageimmobilisation';

import { formatDate, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ConfirmEventType, ConfirmationService, LazyLoadEvent, Message, MessageService,PrimeNGConfig } from 'primeng/api';

import { TranslateService  } from '@ngx-translate/core';
import { Observable,forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-manageimmobilisation',
  templateUrl: './manageimmobilisation.component.html',
  styleUrls: ['./manageimmobilisation.component.scss'],
  providers:[ManageImmobilisationService, MessageService, ConfirmationService, DatePipe ]
})
export class ManageImmobilisationComponent implements OnInit, AfterViewInit {

  @ViewChild(ImmobilisationComponent) Immobilisation;
  
  listImmobilisation:Immobilisation[]=[]
  loading:boolean;
  saveE:boolean
  Immobilisationselected:Immobilisation=new Immobilisation();
  currentImmobilisation:Immobilisation=new Immobilisation();
  newImmobilisation:boolean=false;
  displayImmobilisationDialog:boolean=false;
  backendmessages:Message[]=[];
  errorbackend:boolean=false;



  constructor(private config: PrimeNGConfig,private manageImmobilisationService: ManageImmobilisationService,private messageService: MessageService,
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
    this.manageImmobilisationService.requestDataFromMultipleSources()
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

  RefreshAllImmobilisation(){
    this.loading = true;
    this.errorbackend=false;
    this.backendmessages=[]
    this.listImmobilisation=[]
    this.manageImmobilisationService.getAllImmobilisation()
    .subscribe({
      next: (responseList) => {  
        this.listImmobilisation= responseList
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
      if (this.newImmobilisation){
        this.listImmobilisation=[this.Immobilisation.immobilisation ,...this.listImmobilisation]
      }
      else{
        Object.assign(this.currentImmobilisation,JSON.parse(JSON.stringify(this.Immobilisation.immobilisation)))
      }
    this.displayImmobilisationDialog=false;
    }
  }

  openNewImmobilisation(){
    //this.selectedmileagecharges=new MileageChargesHeader()
    this.Immobilisationselected=new Immobilisation();
    
    
    this.newImmobilisation=true;
    this.displayImmobilisationDialog=true;
  }

  editImmobilisation(Immobilisation:Immobilisation){
    this.newImmobilisation=false;
    this.currentImmobilisation=Immobilisation
    this.Immobilisationselected=Object.assign({},Immobilisation)
    this.displayImmobilisationDialog=true
  }

  deleteImmobilisation(immobilisation: Immobilisation) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cette immobilisation?',
      accept: () => {
        this.manageImmobilisationService.deleteImmobilisation(immobilisation.compteur.valueOf()).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Immobilisation supprimée avec succès',
            });
            
            this.RefreshAllImmobilisation();
          },
         
        });
      },
    });
  }
}
