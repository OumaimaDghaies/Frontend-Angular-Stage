import { ManageTypeMaterielService } from './managetypemateriel.service';
import { TypeMateriel } from './managetypemateriel';
import { registerLocaleData } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, LOCALE_ID, OnChanges,OnInit, Output } from '@angular/core';
import localeFr from '@angular/common/locales/fr';

import * as XLSX from 'xlsx';
import { MessageService } from 'primeng/api';
import { DateTime } from 'luxon';


@Component({
  selector: 'app-typemateriel',
  templateUrl: './typemateriel.component.html',
  //styleUrls: ['./importaccessfees.component.scss'],
  providers:[
    { provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
})
export class TypeMaterielComponent implements OnInit, AfterViewInit{

  @Input() newTypeMateriel:boolean;

  @Input() typemateriel:TypeMateriel;
  @Output() TypeMaterielChange:EventEmitter<TypeMateriel> =new EventEmitter<TypeMateriel>(); ;
  
  @Input() saveE:Boolean;
  @Output() saveEChange:EventEmitter<boolean> =new EventEmitter<boolean>(); 

  checked: boolean = false;

  constructor(private manageTypeMaterielService: ManageTypeMaterielService,private messageService: MessageService) { }


  ngOnInit(): void {
    //console.log("yyy"+JSON.stringify(this.mileagecharges))
    registerLocaleData(localeFr);
    
  }

  

  ngAfterViewInit(): void {
  }

  saveTypeMateriel(){
    this.manageTypeMaterielService.saveTypeMateriel(this.typemateriel,this.newTypeMateriel)
    .subscribe({next: (data) => {  
      this.TypeMaterielChange.emit(this.typemateriel)
      this.saveEChange.emit(true);
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Type TypeMateriel enregistré avec succès.' });
      
      
    },
    error:(error)=>{
      //console.log(JSON.stringify("erroe" + error))
      //this.errorbackend=true
    }})
      //console.log("hkhjk:"+JSON.stringify(this.pos))*/
    }
}
