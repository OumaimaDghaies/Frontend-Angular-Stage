import { ManagePreparationService } from './managepreparation.service';
import { Preparation } from './managepreparation';
import { registerLocaleData } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, LOCALE_ID, OnChanges,OnInit, Output } from '@angular/core';
import localeFr from '@angular/common/locales/fr';

import * as XLSX from 'xlsx';
import { MessageService } from 'primeng/api';
import { DateTime } from 'luxon';


@Component({
  selector: 'app-preparation',
  templateUrl: './preparation.component.html',
  //styleUrls: ['./importaccessfees.component.scss'],
  providers:[
    { provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
})
export class PreparationComponent implements OnInit, AfterViewInit{

  @Input() newPreparation:boolean;

  @Input() preparation:Preparation;
  @Output() preparationChange:EventEmitter<Preparation> =new EventEmitter<Preparation>(); ;
  
  @Input() saveE:Boolean;
  @Output() saveEChange:EventEmitter<boolean> =new EventEmitter<boolean>(); 

  checked: boolean = false;

  constructor(private managepreparationService: ManagePreparationService,private messageService: MessageService) { }


  ngOnInit(): void {
    //console.log("yyy"+JSON.stringify(this.mileagecharges))
    registerLocaleData(localeFr);
    
  }

  

  ngAfterViewInit(): void {
  }

  savePreparation(){
    this.managepreparationService.savePreparation(this.preparation,this.newPreparation)
    .subscribe({next: (data) => {  
      this.preparationChange.emit(this.preparation)
      this.saveEChange.emit(true);
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Preparation enregistré avec succès.' });
      
      
    },
    error:(error)=>{
      //console.log(JSON.stringify("erroe" + error))
      //this.errorbackend=true
    }})
      //console.log("hkhjk:"+JSON.stringify(this.pos))*/
    }
}
