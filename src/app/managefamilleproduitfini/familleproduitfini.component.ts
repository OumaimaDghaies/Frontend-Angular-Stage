import { ManageFamilleProduitFiniService } from './managefamilleproduitfini.service';
import { FamilleProduitFini } from './managefamilleproduitfini';
import { registerLocaleData } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, LOCALE_ID, OnChanges,OnInit, Output } from '@angular/core';
import localeFr from '@angular/common/locales/fr';

import * as XLSX from 'xlsx';
import { MessageService } from 'primeng/api';
import { DateTime } from 'luxon';


@Component({
  selector: 'app-familleproduitfini',
  templateUrl: './familleproduitfini.component.html',
  //styleUrls: ['./importaccessfees.component.scss'],
  providers:[
    { provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
})
export class FamilleProduitFiniComponent implements OnInit, AfterViewInit{

  @Input() newfamillePFini:boolean;

  @Input() famillePFini:FamilleProduitFini;
  @Output() famillePFiniChange:EventEmitter<FamilleProduitFini> =new EventEmitter<FamilleProduitFini>(); ;
  
  @Input() saveE:Boolean;
  @Output() saveEChange:EventEmitter<boolean> =new EventEmitter<boolean>(); 

  checked: boolean = false;

  constructor(private managefamillePFiniService: ManageFamilleProduitFiniService,private messageService: MessageService) { }


  ngOnInit(): void {
    //console.log("yyy"+JSON.stringify(this.mileagecharges))
    registerLocaleData(localeFr);
    
  }

  

  ngAfterViewInit(): void {
  }

  saveFamilleProduitFini(){
    this.managefamillePFiniService.saveFamilleProduitFini(this.famillePFini,this.newfamillePFini)
    .subscribe({next: (data) => {  
      this.famillePFiniChange.emit(this.famillePFini)
      this.saveEChange.emit(true);
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Famille Produit Fini enregistré avec succès.' });
      
      
    },
    error:(error)=>{
      //console.log(JSON.stringify("erroe" + error))
      //this.errorbackend=true
    }})
      //console.log("hkhjk:"+JSON.stringify(this.pos))*/
    }
}
