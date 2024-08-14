import { registerLocaleData } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, LOCALE_ID, OnChanges,OnInit, Output } from '@angular/core';
import localeFr from '@angular/common/locales/fr';

import * as XLSX from 'xlsx';
import { Gamme} from './managegamme';
import { ManageGammeService } from './managegamme.service'
import { MessageService } from 'primeng/api';
import { DateTime } from 'luxon';


@Component({
  selector: 'app-gamme',
  templateUrl: './gamme.component.html',
  //styleUrls: ['./importaccessfees.component.scss'],
  providers:[
    { provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
})
export class GammeComponent implements OnInit, AfterViewInit{

  @Input() newgamme:boolean;

  @Input() gamme:Gamme;
  @Output() gammeChange:EventEmitter<Gamme> =new EventEmitter<Gamme>(); ;
  
  @Input() saveE:Boolean;
  @Output() saveEChange:EventEmitter<boolean> =new EventEmitter<boolean>(); 

  checked: boolean = false;
  codeGammeReferenceOptions: any[] = [];

  constructor(private managegammeService: ManageGammeService,private messageService: MessageService) { }


  ngOnInit(): void {
    //console.log("yyy"+JSON.stringify(this.mileagecharges))
    registerLocaleData(localeFr);
    
  }

  

  ngAfterViewInit(): void {
  }

  saveGamme(){
    this.managegammeService.saveGamme(this.gamme,this.newgamme)
    .subscribe({next: (data) => {  
      this.gammeChange.emit(this.gamme)
      this.saveEChange.emit(true);
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Gamme enregistrée avec succès' });
    },
    error: (error) => {
      this.messageService.add({ severity: 'error', summary: 'Échec', detail: 'Échec de l enregistrement de la gamme' });
    }
  });
      //console.log("hkhjk:"+JSON.stringify(this.pos))*/
    }

    onGammeReferencesChange(): void {
      if (this.gamme.gammeReferences) {
        this.managegammeService.getAllGamme().subscribe({
          next: (data) => {
            this.codeGammeReferenceOptions = data.map(gamme => ({ label: gamme.codeGamme, value: gamme.codeGamme }));
          },
          error: (error) => {
            // Handle error
          }
        });
      } else {
        this.codeGammeReferenceOptions = [];
      }
    }
}
