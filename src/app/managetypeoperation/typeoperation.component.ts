import { ManageTypeOperationService } from './managetypeoperation.service';
import { TypeOperation } from './managetypeoperation';
import { registerLocaleData } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, LOCALE_ID, OnChanges,OnInit, Output } from '@angular/core';
import localeFr from '@angular/common/locales/fr';

import * as XLSX from 'xlsx';
import { MessageService } from 'primeng/api';
import { DateTime } from 'luxon';


@Component({
  selector: 'app-typeoperation',
  templateUrl: './typeoperation.component.html',
  //styleUrls: ['./importaccessfees.component.scss'],
  providers:[
    { provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
})
export class TypeOperationComponent implements OnInit, AfterViewInit{

  @Input() newTypeOperation:boolean;

  @Input() typeoperation:TypeOperation;
  @Output() TypeOperationChange:EventEmitter<TypeOperation> =new EventEmitter<TypeOperation>(); ;
  
  @Input() saveE:Boolean;
  @Output() saveEChange:EventEmitter<boolean> =new EventEmitter<boolean>(); 

  checked: boolean = false;

  constructor(private manageTypeOperationService: ManageTypeOperationService,private messageService: MessageService) { }


  ngOnInit(): void {
    //console.log("yyy"+JSON.stringify(this.mileagecharges))
    registerLocaleData(localeFr);
    
  }

  

  ngAfterViewInit(): void {
  }

  saveTypeOperation(){
    this.manageTypeOperationService.saveTypeOperation(this.typeoperation,this.newTypeOperation)
    .subscribe({next: (data) => {  
      this.TypeOperationChange.emit(this.typeoperation)
      this.saveEChange.emit(true);
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Type TypeOperation enregistré avec succès.' });
      
      
    },
    error:(error)=>{
      //console.log(JSON.stringify("erroe" + error))
      //this.errorbackend=true
    }})
      //console.log("hkhjk:"+JSON.stringify(this.pos))*/
    }
}
