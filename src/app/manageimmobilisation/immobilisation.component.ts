import { ManageImmobilisationService } from './manageimmobilisation.service';
import { Immobilisation } from './manageimmobilisation';
import { registerLocaleData } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, LOCALE_ID, OnChanges,OnInit, Output } from '@angular/core';
import localeFr from '@angular/common/locales/fr';

import * as XLSX from 'xlsx';
import { MessageService } from 'primeng/api';
import { DateTime } from 'luxon';


@Component({
  selector: 'app-immobilisation',
  templateUrl: './immobilisation.component.html',
  //styleUrls: ['./importaccessfees.component.scss'],
  providers:[
    { provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
})
export class ImmobilisationComponent implements OnInit, AfterViewInit{

  @Input() newImmobilisation:boolean;

  @Input() immobilisation:Immobilisation;
  @Output() ImmobilisationChange:EventEmitter<Immobilisation> =new EventEmitter<Immobilisation>(); ;
  
  @Input() saveE:Boolean;
  @Output() saveEChange:EventEmitter<boolean> =new EventEmitter<boolean>(); 

  checked: boolean = false;

  constructor(private manageImmobilisationService: ManageImmobilisationService,private messageService: MessageService) { }


  ngOnInit(): void {
    //console.log("yyy"+JSON.stringify(this.mileagecharges))
    registerLocaleData(localeFr);
    
  }

  

  ngAfterViewInit(): void {
  }

  saveImmobilisation(){
    this.manageImmobilisationService.saveImmobilisation(this.immobilisation,this.newImmobilisation)
    .subscribe({next: (data) => {  
      this.ImmobilisationChange.emit(this.immobilisation)
      this.saveEChange.emit(true);
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Immobilisation enregistré avec succès.' });
      
      
    },
    error:(error)=>{
      //console.log(JSON.stringify("erroe" + error))
      //this.errorbackend=true
    }})
      //console.log("hkhjk:"+JSON.stringify(this.pos))*/
    }
}
