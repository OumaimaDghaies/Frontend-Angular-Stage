import { ManageFamilleProduitFiniService } from './managefamilleproduitfini.service';
import { Component,OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FamilleProduitFini} from './managefamilleproduitfini';

import { formatDate, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ConfirmEventType, ConfirmationService, LazyLoadEvent, Message, MessageService,PrimeNGConfig } from 'primeng/api';
import { FamilleProduitFiniComponent } from './familleproduitfini.component';
import { TranslateService  } from '@ngx-translate/core';
import { Observable,forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-managefamilleproduitfini',
  templateUrl: './managefamilleproduitfini.component.html',
  styleUrls: ['./managefamilleproduitfini.component.scss'],
  providers:[ManageFamilleProduitFiniService, MessageService, ConfirmationService, DatePipe ]
})
export class ManageFamilleProduitFiniComponent implements OnInit, AfterViewInit {

  @ViewChild(FamilleProduitFiniComponent) FamilleProduitFini;
  
  listfamillePFinis:FamilleProduitFini[]=[]
  loading:boolean;
  saveE:boolean
  famillePFiniselected:FamilleProduitFini=new FamilleProduitFini();
  currentfamillePFini:FamilleProduitFini=new FamilleProduitFini();
  newfamillePFini:boolean=false;
  displayFamillePFiniDialog:boolean=false;
  backendmessages:Message[]=[];
  errorbackend:boolean=false;



  constructor(private config: PrimeNGConfig,private managefamillePFiniService: ManageFamilleProduitFiniService,private messageService: MessageService,
    private confirmationService: ConfirmationService,private translateService: TranslateService,
    private datePipe: DatePipe ) { }
    //
    //
  ngOnInit(): void {
    registerLocaleData(localeFr);
    
  }

  translate(lang: string) {
  }

  getRandomInt(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ngAfterViewInit(): void {
    this.errorbackend=false;
    this.backendmessages=[]
    this.managefamillePFiniService.requestDataFromMultipleSources()
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

  RefreshAllFamilleProduitFinis(){
    this.loading = true;
    this.errorbackend=false;
    this.backendmessages=[]
    this.listfamillePFinis=[]
    this.managefamillePFiniService.getAllFamilleProduitFini()
    .subscribe({
      next: (responseList) => {  
        this.listfamillePFinis= responseList
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
      if (this.newfamillePFini){
        this.listfamillePFinis=[this.FamilleProduitFini.famillePFini ,...this.listfamillePFinis]
      }
      else{
        Object.assign(this.currentfamillePFini,JSON.parse(JSON.stringify(this.FamilleProduitFini.famillePFini)))
      }
    this.displayFamillePFiniDialog=false;
    }
  }

  openNewFamilleProduitFini(){
    //this.selectedmileagecharges=new MileageChargesHeader()
    this.famillePFiniselected=new FamilleProduitFini();
    
    
    this.newfamillePFini=true;
    this.displayFamillePFiniDialog=true;
  }

  editFamilleProduitFini(famillePFini:FamilleProduitFini){
    this.newfamillePFini=false;
    this.currentfamillePFini=famillePFini
    this.famillePFiniselected=Object.assign({},famillePFini)
    this.displayFamillePFiniDialog=true
  }

  deleteFamilleProduitFini(famille: FamilleProduitFini) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cette famille?',
      accept: () => {
        this.managefamillePFiniService.deleteFamilleProduitFini(famille.id.valueOf()).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Famille supprimée avec succès',
            });
            
            this.RefreshAllFamilleProduitFinis();
          },
         
        });
      },
    });
  }
}
