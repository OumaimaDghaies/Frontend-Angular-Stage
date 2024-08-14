import { ManagePanneService } from './managepanne.service';
import { Panne, TypePanne } from './managepanne';
import { registerLocaleData } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, LOCALE_ID, OnChanges,OnInit, Output } from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import { ManageTypepanneService } from '../managetypepanne/managetypepanne.service';
import * as XLSX from 'xlsx';
import { MessageService } from 'primeng/api';
import { DateTime } from 'luxon';


@Component({
  selector: 'app-panne',
  templateUrl: './panne.component.html',
  //styleUrls: ['./importaccessfees.component.scss'],
  providers:[
    { provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
})
export class PanneComponent implements OnInit, AfterViewInit{

  @Input() newPanne:boolean;

  @Input() panne:Panne;
  @Output() PanneChange:EventEmitter<Panne> =new EventEmitter<Panne>(); ;
  
  @Input() saveE:Boolean;
  @Output() saveEChange:EventEmitter<boolean> =new EventEmitter<boolean>(); 

  checked: boolean = false;
  typepannes: TypePanne[]=[];
  selectedtypepanne: TypePanne;
  constructor(private managePanneService: ManagePanneService,
    private messageService: MessageService,
  private manageTypepanneService: ManageTypepanneService) { }


  ngOnInit(): void {
    //console.log("yyy"+JSON.stringify(this.mileagecharges))
    registerLocaleData(localeFr);
    this.initializePanne();
    this.loadTypepanne();
    
  }

  

  ngAfterViewInit(): void {
  }

  initializePanne() {
    if (!this.panne) {
      this.panne = new Panne();
    }
    if (!this.panne.typepanne) {
      this.panne.typepanne = new TypePanne();
    }
   
  }
  savePanne(){
    this.initializePanne();
    if (!this.selectedtypepanne) {
      console.error('Selected type panne fini is undefined.');
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez sélectionner un type panne.' });
      return;
    }
  
    this.panne.typepanne.id=this.selectedtypepanne.id
    this.managePanneService.savePanne(this.panne,this.newPanne)
    .subscribe({next: (data) => {  
      this.PanneChange.emit(this.panne)
      this.saveEChange.emit(true);
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Type Panne enregistré avec succès.' });
      
      
    },
    error:(error)=>{
      //console.log(JSON.stringify("erroe" + error))
      //this.errorbackend=true
    }})
      //console.log("hkhjk:"+JSON.stringify(this.pos))*/
    }

    loadTypepanne(): void {
      this.manageTypepanneService.getAllTypepanne().subscribe({
        next: (data) => {
          this.typepannes = data;
        },
        error: (error) => {
          console.error('Error fetching type panne:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch type panne.' });
        }
      });
    }
}
