import { TypeMaterielComponent } from './typemateriel.component';
import { ManageTypeMaterielService } from './managetypemateriel.service';
import { Component,OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { TypeMateriel} from './managetypemateriel';

import { formatDate, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ConfirmEventType, ConfirmationService, LazyLoadEvent, Message, MessageService,PrimeNGConfig } from 'primeng/api';

import { TranslateService  } from '@ngx-translate/core';
import { Observable,forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-managetypemateriel',
  templateUrl: './managetypemateriel.component.html',
  styleUrls: ['./managetypemateriel.component.scss'],
  providers:[ManageTypeMaterielService, MessageService, ConfirmationService, DatePipe ]
})
export class ManageTypeMaterielComponent implements OnInit, AfterViewInit {

  @ViewChild(TypeMaterielComponent) TypeMateriel;
  
  listTypeMateriel:TypeMateriel[]=[]
  loading:boolean;
  saveE:boolean
  TypeMaterielselected:TypeMateriel=new TypeMateriel();
  currentTypeMateriel:TypeMateriel=new TypeMateriel();
  newTypeMateriel:boolean=false;
  displayTypeMaterielDialog:boolean=false;
  backendmessages:Message[]=[];
  errorbackend:boolean=false;



  constructor(private config: PrimeNGConfig,private manageTypeMaterielService: ManageTypeMaterielService,private messageService: MessageService,
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
    this.manageTypeMaterielService.requestDataFromMultipleSources()
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

  RefreshAllTypeMateriel(){
    this.loading = true;
    this.errorbackend=false;
    this.backendmessages=[]
    this.listTypeMateriel=[]
    this.manageTypeMaterielService.getAllTypeMateriel()
    .subscribe({
      next: (responseList) => {  
        this.listTypeMateriel= responseList
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
      if (this.newTypeMateriel){
        this.listTypeMateriel=[this.TypeMateriel.typemateriel ,...this.listTypeMateriel]
      }
      else{
        Object.assign(this.currentTypeMateriel,JSON.parse(JSON.stringify(this.TypeMateriel.typemateriel)))
      }
    this.displayTypeMaterielDialog=false;
    }
  }

  openNewTypeMateriel(){
    //this.selectedmileagecharges=new MileageChargesHeader()
    this.TypeMaterielselected=new TypeMateriel();
    
    
    this.newTypeMateriel=true;
    this.displayTypeMaterielDialog=true;
  }

  editTypeMateriel(typemateriel:TypeMateriel){
    this.newTypeMateriel=false;
    this.currentTypeMateriel=typemateriel
    this.TypeMaterielselected=Object.assign({},typemateriel)
    this.displayTypeMaterielDialog=true
  }
  deleteTypeMateriel(typemateriel: TypeMateriel) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cette Type TypeMateriel?',
      accept: () => {
        this.manageTypeMaterielService.deleteTypeMateriel(typemateriel.compteur.valueOf()).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Type TypeMateriel supprimée avec succès',
            });
            
            this.RefreshAllTypeMateriel();
          },
         
        });
      },
    });
  }
}
