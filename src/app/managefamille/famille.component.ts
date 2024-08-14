import { registerLocaleData } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, LOCALE_ID, OnChanges,OnInit, Output, ViewChild } from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import * as XLSX from 'xlsx';
import { Famille, SousFamille,} from './managefamille';
import { ManageFamilleService } from './managefamille.service'
import { MessageService } from 'primeng/api';
import { DateTime } from 'luxon';
import { TableRowExpandEvent, TableRowCollapseEvent } from 'primeng/table';

import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-famille',
  templateUrl: './famille.component.html',
  //styleUrls: ['./importaccessfees.component.scss'],
  providers:[
    { provide: LOCALE_ID, useValue: 'fr-FR'},
    ConfirmationService
  ],
})
export class FamilleComponent implements OnInit, AfterViewInit {
  @Input() newfamille: boolean;
  @Input() famille: Famille;
  @Input() newsousfamille: boolean;
  @Input() sousfamille: SousFamille = new SousFamille();
  @Output() familleeChange: EventEmitter<Famille> = new EventEmitter<Famille>(); 
  @Input() listsousfamille: SousFamille[];
  @Input() saveE: Boolean;
  @Output() saveEChange: EventEmitter<boolean> = new EventEmitter<boolean>(); 

  checked: boolean = false;
  sousfamilles!: SousFamille[];
  expandedRows = {};
  listsousfamilles: SousFamille[] = [];
  sousfamilleselected: SousFamille = new SousFamille();
  currentsousfamille: SousFamille = new SousFamille();
  displaySousFamilleDialog: boolean = false;
  clonedSousFamille: { [s: string]: SousFamille } = {};
  
  constructor(private managefamilleService: ManageFamilleService, private messageService: MessageService , private confirmationService:ConfirmationService) { }

  ngOnInit(): void {
    registerLocaleData(localeFr);
    this.loadSousFamilles();
  }

  ngAfterViewInit(): void { }

  saveFamille() {
    this.managefamilleService.saveFamille(this.famille, this.newfamille)
      .subscribe({
        next: (data) => {  
          this.saveEChange.emit(true);
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Famille enregistré avec succès.' });
      
        },
        error: (error) => {
          // Handle error
        }
      });
  }

  onRowExpand(event: TableRowExpandEvent) {
    this.messageService.add({ severity: 'info', summary: 'Family Expanded', detail: event.data.id, life: 3000 });
  }

  onRowCollapse(event: TableRowCollapseEvent) {
    this.messageService.add({ severity: 'success', summary: 'Family Collapsed', detail: event.data.id, life: 3000 });
  }

  saveSousFamille() {
    console.log(JSON.stringify(this.famille))
    this.famille.listeSousFamilles=[...this.famille.listeSousFamilles,this.sousfamille]
    
  }


  loadSousFamilles(): void {
    this.managefamilleService.getAllSousFamilles().subscribe((data: SousFamille[]) => {
      this.sousfamilles = data;
    });
  }

  updateSousFamille(saveE: boolean): void {
    if (saveE) {
      if (this.newsousfamille) {
        this.listsousfamille = [this.sousfamille, ...this.listsousfamille];
      } else {
        Object.assign(this.currentsousfamille, JSON.parse(JSON.stringify(this.sousfamille)));
      }
    }
    this.loadSousFamilles(); // Refresh data after updating
  }

  editSousFamille(sousfamille: SousFamille) {
    this.newsousfamille = false;
    this.currentsousfamille = sousfamille;
    this.sousfamilleselected = Object.assign({}, sousfamille);
  }

  onRowEditSave(sousfamille: SousFamille): void {
    this.managefamilleService.updateSousFamille(sousfamille).subscribe({
      next: () => {
        delete this.clonedSousFamille[sousfamille.idsousfamille as unknown as string];
        this.loadSousFamilles(); // Refresh data after saving
      },
      error: (error) => {
        // Handle error
      }
    });
  }

  onRowEditCancel(sousfamille: SousFamille, index: number) {
    this.sousfamilles[index] = this.clonedSousFamille[sousfamille.idsousfamille as unknown as string];
    delete this.clonedSousFamille[sousfamille.idsousfamille as unknown as string];
  }

  onRowEditInit(sousfamille: SousFamille) {
    this.clonedSousFamille[sousfamille.idsousfamille as unknown as string] = { ...sousfamille };
  }

  deleteSousFamille(idsousfamille: number): void {
    this.confirmationService.confirm({
      message: `Êtes-vous sûr de vouloir supprimer la sous-famille avec l'ID ${idsousfamille} ?`,
      header: 'Confirmation de suppression',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.managefamilleService.deleteSousFamille(idsousfamille).subscribe(
          () => {
            this.famille.listeSousFamilles = this.famille.listeSousFamilles.filter((sf: any) => sf.idsousfamille !== idsousfamille);
            this.loadSousFamilles();
            this.messageService.add({ severity: 'success', summary: 'Sous Famille Supprimée', detail: `Sous famille avec ID ${idsousfamille} a été supprimée avec succès`, life: 3000 });
          },
          
        );
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Suppression annulée', detail: `La suppression de la sous-famille avec l'ID ${idsousfamille} a été annulée`, life: 3000 });
      }
    });
  }
}

