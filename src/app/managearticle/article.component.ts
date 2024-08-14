import { ManageArticleService } from './managearticle.service';
import { Article, Famille, SousFamille } from './managearticle';
import { registerLocaleData } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, LOCALE_ID, OnInit, Output } from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import * as XLSX from 'xlsx';
import { MessageService } from 'primeng/api';
import { ManageFamilleService } from '../managefamille/managefamille.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
})
export class ArticleComponent implements OnInit, AfterViewInit {

  @Input() newArticle: boolean;
  @Input() article: Article;
  @Output() ArticleChange: EventEmitter<Article> = new EventEmitter<Article>();
  @Input() saveE: boolean;
  @Output() saveEChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  checked: boolean = false;
  familles: Famille[] = [];
  sousFamilles: SousFamille[] = [];
  selectedFamille: Famille;
  selectedSousFamille: SousFamille;
  FamilleOptions: any[] = [];
  constructor(private manageArticleService: ManageArticleService,
              private messageService: MessageService,
              private manageFamilleService: ManageFamilleService) { }

  ngOnInit(): void {
    registerLocaleData(localeFr);
    this.loadFamilles();
    this.initializeArticle();
  }

  ngAfterViewInit(): void {
  }

  loadFamilles() {
    this.manageFamilleService.getAllFamilles().subscribe((familles) => {
      this.familles = familles;
    
    });
  }

  onFamilleChange(event) {
    if (this.selectedFamille) {
      this.sousFamilles = this.selectedFamille.listeSousFamilles;
    } else {
      this.sousFamilles = [];
    }
  }

  initializeArticle() {
    if (!this.article) {
      this.article = new Article();
    }
    if (!this.article.famille) {
      this.article.famille = new Famille();
    }
    if (!this.article.sousfamille) {
      this.article.sousfamille = new SousFamille();
    }
  }

  saveArticle() {
    
    this.initializeArticle();
    if (!this.selectedFamille) {
      console.error('Selected famille is undefined.');
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez sélectionner une famille.' });
      return;
    }

    this.article.famille.id = this.selectedFamille.id;

    if (!this.selectedSousFamille) {
      console.error('Selected sous-famille is undefined.');
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez sélectionner une sous-famille.' });
      return;
    }

    this.article.sousfamille.idsousfamille = this.selectedSousFamille.idsousfamille;

    this.manageArticleService.saveArticle(this.article).subscribe({
      next: (data) => {
        this.ArticleChange.emit(this.article);
        this.saveEChange.emit(true);
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Article enregistré avec succès.' });
      },
      error: (error) => {
        console.error('Error saving article:', error);
      }
    });
  }
}
