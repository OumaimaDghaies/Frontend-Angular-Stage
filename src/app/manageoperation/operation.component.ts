import { ManageOperationService } from './manageoperation.service';
import { Operation, TypeMateriel, TypeOperation } from './manageoperation';
import { registerLocaleData } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, LOCALE_ID, OnChanges,OnInit, Output } from '@angular/core';
import localeFr from '@angular/common/locales/fr';

import * as XLSX from 'xlsx';
import { MessageService } from 'primeng/api';
import { DateTime } from 'luxon';
import { ManageTypeMaterielService } from '../managetypemateriel/managetypemateriel.service';
import { ManageTypeOperationService } from '../managetypeoperation/managetypeoperation.service';
@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  //styleUrls: ['./importaccessfees.component.scss'],
  providers:[
    { provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
})
export class OperationComponent implements OnInit, AfterViewInit{

  @Input() newOperation:boolean;

  @Input() operation:Operation;
  @Output() OperationChange:EventEmitter<Operation> =new EventEmitter<Operation>(); ;
  
  @Input() saveE:Boolean;
  @Output() saveEChange:EventEmitter<boolean> =new EventEmitter<boolean>(); 

  checked: boolean = false;

  typemateriel:TypeMateriel[]=[];
  typeoperation:TypeOperation[]=[];

  selectedTypeMateriel: TypeMateriel;
  selectedTypeOperation: TypeOperation;


  constructor(private manageOperationService: ManageOperationService,
    private messageService: MessageService,
  private manageTypeMaterielService:ManageTypeMaterielService,
private manageTypeOperationService:ManageTypeOperationService) { }


  ngOnInit(): void {
    //console.log("yyy"+JSON.stringify(this.mileagecharges))
    registerLocaleData(localeFr);
    this.initializeOperation();
    this.loadTypeMateriel();
    this.loadTypeOperation();
    
  }
  initializeOperation() {
    if (!this.operation) {
      this.operation = new Operation();
    }
    if (!this.operation.typemateriel) {
      this.operation.typemateriel = new TypeMateriel();
    }
    if (!this.operation.typeoperation) {
      this.operation.typeoperation = new TypeOperation();
    }
  }
  

  ngAfterViewInit(): void {
  }

  saveOperation(){
    this.initializeOperation();

    if (!this.selectedTypeMateriel) {
      console.error('Selected TypeMateriel is undefined.');
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez sélectionner Type Materiel.' });
      return;
    }

    this.operation.typemateriel.compteur = this.selectedTypeMateriel.compteur;

    if (!this.selectedTypeOperation) {
      console.error('Selected Type Operation is undefined.');
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez sélectionner une TypeOperation.' });
      return;
    }
    this.operation.typeoperation.compteur = this.selectedTypeOperation.compteur;

    this.manageOperationService.saveOperation(this.operation,this.newOperation)
    .subscribe({next: (data) => {  
      this.OperationChange.emit(this.operation)
      this.saveEChange.emit(true);
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Type Operation enregistré avec succès.' });
      
      
    },
    error:(error)=>{
      //console.log(JSON.stringify("erroe" + error))
      //this.errorbackend=true
    }})
      //console.log("hkhjk:"+JSON.stringify(this.pos))*/
    }

    loadTypeMateriel(): void {
      this.manageTypeMaterielService.getAllTypeMateriel().subscribe({
        next: (data) => {
          this.typemateriel = data;
          
       
        },
        error: (error) => {
          console.error('Error fetching type operation:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to fetch type operation.',
          });
        },
      });
    }

    loadTypeOperation(): void {
      this.manageTypeOperationService.getAllTypeOperation().subscribe({
        next: (data) => {
          this.typeoperation = data;
          
       
        },
        error: (error) => {
          console.error('Error fetching type operation:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to fetch type operation.',
          });
        },
      });
    }
}
