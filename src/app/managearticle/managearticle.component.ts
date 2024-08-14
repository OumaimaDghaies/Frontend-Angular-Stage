import { Famille } from './../managefamille/managefamille';
import { ManageArticleService } from './managearticle.service';
import { Component,OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Article, SousFamille} from './managearticle';

import { formatDate, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ConfirmEventType, ConfirmationService, LazyLoadEvent, Message, MessageService,PrimeNGConfig } from 'primeng/api';
import { ArticleComponent } from './article.component';
import { TranslateService  } from '@ngx-translate/core';
import { Observable,forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ManageFamilleService } from '../managefamille/managefamille.service';

@Component({
  selector: 'app-managearticle',
  templateUrl: './managearticle.component.html',
  styleUrls: ['./managearticle.component.scss'],
  providers:[ManageArticleService, MessageService, ConfirmationService, DatePipe ]
})
export class ManageArticleComponent implements OnInit, AfterViewInit {

  @ViewChild(ArticleComponent) Article;
  
  listArticles:Article[]=[]
  loading:boolean;
  saveE:boolean
  Articleselected:Article=new Article();
  currentArticle:Article=new Article();
  newArticle:boolean=false;
  displayArticleDialog:boolean=false;
  backendmessages:Message[]=[];
  errorbackend:boolean=false;
  sousfamille: SousFamille[];
  famille: Famille[];

  

  constructor(private config: PrimeNGConfig,private manageArticleService: ManageArticleService,private messageService: MessageService,
    private confirmationService: ConfirmationService,private translateService: TranslateService,
    private datePipe: DatePipe, private managefamilleService:ManageFamilleService ) { }
    //
    //
  ngOnInit(): void {
    registerLocaleData(localeFr);
    this.loadSousFamilles();
    this.loadFamilles();
    
  }

  translate(lang: string) {
  }

  getRandomInt(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ngAfterViewInit(): void {
    this.errorbackend=false;
    this.backendmessages=[]
    this.manageArticleService.requestDataFromMultipleSources()
    .subscribe({
      next: (responseList) => {  
        
        this.loading=false
    },
    error:(error)=>{
      this.errorbackend=true
      this.backendmessages = [{ severity: 'error', summary: 'Error', detail: 'Impossible de contacter le serveur!! Merci de contacter le support.' }];
      
      this.loading = false
    }})
  }

  loadSousFamilles(): void {
    this.managefamilleService.getAllSousFamilles().subscribe((sousfamille) => {
      this.sousfamille = sousfamille;
    });
  }

  loadFamilles() {
    this.managefamilleService.getAllFamilles().subscribe((famille) => {
      this.famille = famille;
    
    });
  }

  RefreshAllArticle(){
    this.loading = true;
    this.errorbackend=false;
    this.backendmessages=[]
    this.listArticles=[]
    this.manageArticleService.getAllArticle()
    .subscribe({
      next: (responseList) => {  
        this.listArticles= responseList
        this.loading=false
    },
    error:(error)=>{
      //console.log(JSON.stringify("erroe" + error))
      //this.errorbackend=true
      this.errorbackend=true
      this.backendmessages = [{ severity: 'error', summary: 'Error', detail: 'Impossible de contacter le serveur!! Merci de contacter le support.' }];
      
      this.loading = false
    }})
  }

  updatesaveE(saveE:boolean) {
    if (saveE==true){
      if (this.newArticle){
        this.listArticles=[this.Article.article ,...this.listArticles]
      }
      else{
        Object.assign(this.currentArticle,JSON.parse(JSON.stringify(this.Article.article)))
      }
    this.displayArticleDialog=false;
    }
  }

  openNewArticle(){
    //this.selectedmileagecharges=new MileageChargesHeader()
    this.Articleselected=new Article();
    
    
    this.newArticle=true;
    this.displayArticleDialog=true;
  }

  editArticle(article:Article){
    this.newArticle=false;
    this.currentArticle=article
    this.Articleselected=Object.assign({},article)
    this.displayArticleDialog=true
  }

  deleteArticle(article: Article) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cette article?',
      accept: () => {
        this.manageArticleService.deleteArticle(article.id.valueOf()).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Article supprimée avec succès',
            });
            this.RefreshAllArticle();
           
          },
         
        });
      },
    });
}
}
