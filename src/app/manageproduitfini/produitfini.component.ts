import { Component, EventEmitter, Input, OnInit, Output, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ManageProduitFiniService } from './manageproduitfini.service';
import { ProduitFini, Gamme, FamilleProduitFini } from './manageproduitfini';
import { ManageGammeService } from '../managegamme/managegamme.service';
import { ManageFamilleProduitFiniService } from '../managefamilleproduitfini/managefamilleproduitfini.service';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-produitfini',
  templateUrl: './produitfini.component.html',
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ]
})
export class ProduitFiniComponent implements OnInit {

  @Input() newPFini: boolean;
  @Input() PFini: ProduitFini;
  @Output() PFiniChange: EventEmitter<ProduitFini> = new EventEmitter<ProduitFini>();
  @Input() saveE: boolean;
  @Output() saveEChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  gammes: Gamme[] = [];
  selectedGamme: Gamme;
  familleproduitfini: FamilleProduitFini[] = [];
  selectedFamillePF: FamilleProduitFini;

  constructor(
    private managePFiniService: ManageProduitFiniService,
    private messageService: MessageService,
    private manageGammeService: ManageGammeService,
    private manageFamilleProduitFiniService: ManageFamilleProduitFiniService
  ) { }

  ngOnInit(): void {
    registerLocaleData(localeFr);
    this.loadGammes();
    this.loadFamilleProduitFini();
    this.initializeProduitFini();
  }
  initializeProduitFini() {
    if (!this.PFini) {
      this.PFini = new ProduitFini();
    }
    if (!this.PFini.gamme) {
      this.PFini.gamme = new Gamme();
    }
    if (!this.PFini.familleproduitfini) {
      this.PFini.familleproduitfini = new FamilleProduitFini();
    }
  }
    saveProduitFini(): void {
      this.initializeProduitFini();
      if (!this.selectedGamme) {
        console.error('Selected gamme is undefined.');
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez sélectionner une gamme.' });
        return;
      }
    
      // Assign the selected gamme ID to PFini.gammeid
      //this.PFini.gammeid = this.selectedGamme.compteur;
    
      this.PFini.gamme.compteur=this.selectedGamme.compteur;

      if (!this.selectedFamillePF) {
        console.error('Selected famille produit fini is undefined.');
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez sélectionner une famille de produit fini.' });
        return;
      }
    
      // Assign the selected famille produit fini ID to PFini.famillePF
      
      //this.PFini.famillePF = this.selectedFamillePF.id;
      this.PFini.familleproduitfini.id=this.selectedFamillePF.id
    

      this.managePFiniService.saveProduitFini(this.PFini).subscribe({
        next: (data) => {
          this.PFiniChange.emit(this.PFini);
          this.saveEChange.emit(true);
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Produit Fini enregistré avec succès.' });
        },
        error: (error) => {
          console.error('Error saving product:', error);
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la sauvegarde du produit.' });
        }
      });
    }

  loadGammes(): void {
    this.manageGammeService.getAllGamme().subscribe({
      next: (data) => {
        this.gammes = data;
      },
      error: (error) => {
        console.error('Error fetching gammes:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch gammes.' });
      }
    });
  }
  
  loadFamilleProduitFini(): void {
    this.manageFamilleProduitFiniService.getAllFamilleProduitFini().subscribe({
      next: (data) => {
        this.familleproduitfini = data;
      },
      error: (error) => {
        console.error('Error fetching familles:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch familles.' });
      }
    });
  }
}
