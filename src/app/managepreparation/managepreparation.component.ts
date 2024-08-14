import { PreparationComponent } from './preparation.component';
import { ManagePreparationService } from './managepreparation.service';
import { Component,OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Preparation} from './managepreparation';

import { formatDate, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ConfirmEventType, ConfirmationService, LazyLoadEvent, Message, MessageService,PrimeNGConfig } from 'primeng/api';

import { TranslateService  } from '@ngx-translate/core';
import { Observable,forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-managepreparation',
  templateUrl: './managepreparation.component.html',
  styleUrls: ['./managepreparation.component.scss'],
  providers:[ManagePreparationService, MessageService, ConfirmationService, DatePipe ]
})
export class ManagePreparationComponent implements OnInit, AfterViewInit {

  @ViewChild(PreparationComponent) Preparation;
  
  listPreparation:Preparation[]=[]
  loading:boolean;
  saveE:boolean
  Preparationselected:Preparation=new Preparation();
  currentPreparation:Preparation=new Preparation();
  newPreparation:boolean=false;
  displayPreparationDialog:boolean=false;
  backendmessages:Message[]=[];
  errorbackend:boolean=false;



  constructor(private config: PrimeNGConfig,private managepreparationService: ManagePreparationService,private messageService: MessageService,
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
    this.managepreparationService.requestDataFromMultipleSources()
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

  RefreshAllPreparation(){
    this.loading = true;
    this.errorbackend=false;
    this.backendmessages=[]
    this.listPreparation=[]
    this.managepreparationService.getAllPreparation()
    .subscribe({
      next: (responseList) => {  
        this.listPreparation= responseList
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
      if (this.newPreparation){
        this.listPreparation=[this.Preparation.preparation ,...this.listPreparation]
      }
      else{
        Object.assign(this.currentPreparation,JSON.parse(JSON.stringify(this.Preparation.preparation)))
      }
    this.displayPreparationDialog=false;
    }
  }

  openNewPreparation(){
    //this.selectedmileagecharges=new MileageChargesHeader()
    this.Preparationselected=new Preparation();
    
    
    this.newPreparation=true;
    this.displayPreparationDialog=true;
  }

  editPreparation(preparation:Preparation){
    this.newPreparation=false;
    this.currentPreparation=preparation
    this.Preparationselected=Object.assign({},preparation)
    this.displayPreparationDialog=true
  }

  deletePreparation(preparation: Preparation) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cette Preparation?',
      accept: () => {
        this.managepreparationService.deletePreparation(preparation.compteur.valueOf()).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Preparation supprimée avec succès',
            });
            
            this.RefreshAllPreparation();
          },
         
        });
      },
    });
  }
}
