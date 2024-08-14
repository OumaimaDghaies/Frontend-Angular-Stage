import { TypeOperationComponent } from './typeoperation.component';
import { ManageTypeOperationService } from './managetypeoperation.service';
import { Component,OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { TypeOperation} from './managetypeoperation';

import { formatDate, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ConfirmEventType, ConfirmationService, LazyLoadEvent, Message, MessageService,PrimeNGConfig } from 'primeng/api';

import { TranslateService  } from '@ngx-translate/core';
import { Observable,forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-managetypeoperation',
  templateUrl: './managetypeoperation.component.html',
  styleUrls: ['./managetypeoperation.component.scss'],
  providers:[ManageTypeOperationService, MessageService, ConfirmationService, DatePipe ]
})
export class ManageTypeOperationComponent implements OnInit, AfterViewInit {

  @ViewChild(TypeOperationComponent) TypeOperation;
  
  listTypeOperation:TypeOperation[]=[]
  loading:boolean;
  saveE:boolean
  TypeOperationselected:TypeOperation=new TypeOperation();
  currentTypeOperation:TypeOperation=new TypeOperation();
  newTypeOperation:boolean=false;
  displayTypeOperationDialog:boolean=false;
  backendmessages:Message[]=[];
  errorbackend:boolean=false;



  constructor(private config: PrimeNGConfig,private manageTypeOperationService: ManageTypeOperationService,private messageService: MessageService,
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
    this.manageTypeOperationService.requestDataFromMultipleSources()
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

  RefreshAllTypeOperation(){
    this.loading = true;
    this.errorbackend=false;
    this.backendmessages=[]
    this.listTypeOperation=[]
    this.manageTypeOperationService.getAllTypeOperation()
    .subscribe({
      next: (responseList) => {  
        this.listTypeOperation= responseList
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
      if (this.newTypeOperation){
        this.listTypeOperation=[this.TypeOperation.typeoperation ,...this.listTypeOperation]
      }
      else{
        Object.assign(this.currentTypeOperation,JSON.parse(JSON.stringify(this.TypeOperation.typeoperation)))
      }
    this.displayTypeOperationDialog=false;
    }
  }

  openNewTypeOperation(){
    //this.selectedmileagecharges=new MileageChargesHeader()
    this.TypeOperationselected=new TypeOperation();
    
    
    this.newTypeOperation=true;
    this.displayTypeOperationDialog=true;
  }

  editTypeOperation(typeoperation:TypeOperation){
    this.newTypeOperation=false;
    this.currentTypeOperation=typeoperation
    this.TypeOperationselected=Object.assign({},typeoperation)
    this.displayTypeOperationDialog=true
  }
  deleteTypeOperation(typeoperation: TypeOperation) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cette Type TypeOperation?',
      accept: () => {
        this.manageTypeOperationService.deleteTypeOperation(typeoperation.compteur.valueOf()).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Type TypeOperation supprimée avec succès',
            });
            
            this.RefreshAllTypeOperation();
          },
         
        });
      },
    });
  }
}
