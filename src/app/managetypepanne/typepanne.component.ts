import { ManageTypepanneService } from './managetypepanne.service';
import { TypePanne } from './managetypepanne';
import { registerLocaleData } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, LOCALE_ID, OnChanges,OnInit, Output } from '@angular/core';
import localeFr from '@angular/common/locales/fr';

import * as XLSX from 'xlsx';
import { MessageService } from 'primeng/api';
import { DateTime } from 'luxon';


@Component({
  selector: 'app-typepanne',
  templateUrl: './typepanne.component.html',
  //styleUrls: ['./importaccessfees.component.scss'],
  providers:[
    { provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
})
export class TypepanneComponent implements OnInit, AfterViewInit{

  @Input() newTypepanne:boolean;

  @Input() typepanne:TypePanne;
  @Output() TypepanneChange:EventEmitter<TypePanne> =new EventEmitter<TypePanne>(); ;
  
  @Input() saveE:Boolean;
  @Output() saveEChange:EventEmitter<boolean> =new EventEmitter<boolean>(); 

  checked: boolean = false;

  constructor(private manageTypepanneService: ManageTypepanneService,private messageService: MessageService) { }


  ngOnInit(): void {
    //console.log("yyy"+JSON.stringify(this.mileagecharges))
    registerLocaleData(localeFr);
    
  }

  

  ngAfterViewInit(): void {
  }

  saveTypepanne(){
    this.manageTypepanneService.saveTypepanne(this.typepanne,this.newTypepanne)
    .subscribe({next: (data) => {  
      this.TypepanneChange.emit(this.typepanne)
      this.saveEChange.emit(true);
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Type Panne enregistré avec succès.' });
      
      
    },
    error:(error)=>{
      //console.log(JSON.stringify("erroe" + error))
      //this.errorbackend=true
    }})
      //console.log("hkhjk:"+JSON.stringify(this.pos))*/
    }
}
