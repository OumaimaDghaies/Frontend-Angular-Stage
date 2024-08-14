import { OperationComponent } from './operation.component';
import { ManageOperationService } from './manageoperation.service';
import { Component,OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Operation} from './manageoperation';

import { formatDate, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ConfirmEventType, ConfirmationService, LazyLoadEvent, Message, MessageService,PrimeNGConfig } from 'primeng/api';

import { TranslateService  } from '@ngx-translate/core';
import { Observable,forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-manageoperation',
  templateUrl: './manageoperation.component.html',
  styleUrls: ['./manageoperation.component.scss'],
  providers:[ManageOperationService, MessageService, ConfirmationService, DatePipe ]
})
export class ManageOperationComponent implements OnInit, AfterViewInit {

  @ViewChild(OperationComponent) Operation;
  
  listOperation:Operation[]=[]
  loading:boolean;
  saveE:boolean
  Operationselected:Operation=new Operation();
  currentOperation:Operation=new Operation();
  newOperation:boolean=false;
  displayOperationDialog:boolean=false;
  backendmessages:Message[]=[];
  errorbackend:boolean=false;



  constructor(private config: PrimeNGConfig,private manageOperationService: ManageOperationService,private messageService: MessageService,
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
    this.manageOperationService.requestDataFromMultipleSources()
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

  RefreshAllOperation(){
    this.loading = true;
    this.errorbackend=false;
    this.backendmessages=[]
    this.listOperation=[]
    this.manageOperationService.getAllOperation()
    .subscribe({
      next: (responseList) => {  
        this.listOperation= responseList
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
      if (this.newOperation){
        this.listOperation=[this.Operation.operation ,...this.listOperation]
      }
      else{
        Object.assign(this.currentOperation,JSON.parse(JSON.stringify(this.Operation.operation)))
      }
    this.displayOperationDialog=false;
    }
  }

  openNewOperation(){
    //this.selectedmileagecharges=new MileageChargesHeader()
    this.Operationselected=new Operation();
    
    
    this.newOperation=true;
    this.displayOperationDialog=true;
  }

  editOperation(operation:Operation){
    this.newOperation=false;
    this.currentOperation=operation
    this.Operationselected=Object.assign({},operation)
    this.displayOperationDialog=true
  }
  deleteOperation(operation: Operation) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cette Type Operation?',
      accept: () => {
        this.manageOperationService.deleteOperation(operation.compteur.valueOf()).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Type Operation supprimée avec succès',
            });
            
            this.RefreshAllOperation();
          },
         
        });
      },
    });
  }
}
