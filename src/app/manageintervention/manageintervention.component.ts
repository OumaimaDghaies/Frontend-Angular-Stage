import { InterventionComponent } from './intervention.component';
import { ManageInterventionService } from './manageintervention.service';
import { Component,OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Intervention} from './manageintervention';

import { formatDate, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ConfirmEventType, ConfirmationService, LazyLoadEvent, Message, MessageService,PrimeNGConfig } from 'primeng/api';

import { TranslateService  } from '@ngx-translate/core';
import { Observable,forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-manageintervention',
  templateUrl: './manageintervention.component.html',
  styleUrls: ['./manageintervention.component.scss'],
  providers:[ManageInterventionService, MessageService, ConfirmationService, DatePipe ]
})
export class ManageInterventionComponent implements OnInit, AfterViewInit {

  @ViewChild(InterventionComponent) Intervention;
  
  listIntervention:Intervention[]=[]
  loading:boolean;
  saveE:boolean
  Interventionselected:Intervention=new Intervention();
  currentIntervention:Intervention=new Intervention();
  newIntervention:boolean=false;
  displayInterventionDialog:boolean=false;
  backendmessages:Message[]=[];
  errorbackend:boolean=false;



  constructor(private config: PrimeNGConfig,private manageInterventionService: ManageInterventionService,private messageService: MessageService,
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
    this.manageInterventionService.requestDataFromMultipleSources()
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

  RefreshAllIntervention(){
    this.loading = true;
    this.errorbackend=false;
    this.backendmessages=[]
    this.listIntervention=[]
    this.manageInterventionService.getAllIntervention()
    .subscribe({
      next: (responseList) => {  
        this.listIntervention= responseList
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
      if (this.newIntervention){
        this.listIntervention=[this.Intervention.intervention ,...this.listIntervention]
      }
      else{
        Object.assign(this.currentIntervention,JSON.parse(JSON.stringify(this.Intervention.intervention)))
      }
    this.displayInterventionDialog=false;
    }
  }

  openNewIntervention(){
    //this.selectedmileagecharges=new MileageChargesHeader()
    this.Interventionselected=new Intervention();
    
    
    this.newIntervention=true;
    this.displayInterventionDialog=true;
  }

  editIntervention(intervention:Intervention){
    this.newIntervention=false;
    this.currentIntervention=intervention
    this.Interventionselected=Object.assign({},intervention)
    this.displayInterventionDialog=true
  }
  deleteIntervention(intervention: Intervention) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cette Type Intervention?',
      accept: () => {
        this.manageInterventionService.deleteIntervention(intervention.id.valueOf()).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Type Intervention supprimée avec succès',
            });
            
            this.RefreshAllIntervention();
          },
         
        });
      },
    });
  }
}
