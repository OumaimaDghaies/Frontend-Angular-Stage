import { ManageProduitFiniService } from './manageproduitfini.service';
import { Component,OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ProduitFini,Gamme} from './manageproduitfini';
import { ManageGammeService } from '../managegamme/managegamme.service';
import { formatDate, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ConfirmEventType, ConfirmationService, LazyLoadEvent, Message, MessageService,PrimeNGConfig } from 'primeng/api';
import { ProduitFiniComponent } from './produitfini.component';
import { TranslateService  } from '@ngx-translate/core';
import { Observable,forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-manageproduitfini',
  templateUrl: './manageproduitfini.component.html',
  styleUrls: ['./manageproduitfini.component.scss'],
  providers:[ManageProduitFiniService, MessageService, ConfirmationService, DatePipe ]
})
export class ManageProduitFiniComponent implements OnInit, AfterViewInit {

  @ViewChild(ProduitFiniComponent) ProduitFini;
  
  listPFinis:ProduitFini[]=[]
  loading:boolean;
  saveE:boolean
  PFiniselected:ProduitFini=new ProduitFini();
  currentPFini:ProduitFini=new ProduitFini();
  newPFini:boolean=false;
  displayPFiniDialog:boolean=false;
  backendmessages:Message[]=[];
  errorbackend:boolean=false;

  listGammes: Gamme[] = [];

  constructor(private config: PrimeNGConfig,private managePFiniService: ManageProduitFiniService,private messageService: MessageService,
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
    this.managePFiniService.requestDataFromMultipleSources()
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

  RefreshAllProduitFinis(){
    this.loading = true;
    this.errorbackend=false;
    this.backendmessages=[]
    this.listPFinis=[]
    this.managePFiniService.getAllProduitFini()
    .subscribe({
      next: (responseList) => {  
        this.listPFinis= responseList
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
      if (this.newPFini){
        this.listPFinis=[this.ProduitFini.famillePFini ,...this.listPFinis]
      }
      else{
        Object.assign(this.currentPFini,JSON.parse(JSON.stringify(this.ProduitFini.PFini)))
      }
    this.displayPFiniDialog=false;
    }
  }

  openNewProduitFini(){
    //this.selectedmileagecharges=new MileageChargesHeader()
    this.PFiniselected=new ProduitFini();
    
    
    this.newPFini=true;
    this.displayPFiniDialog=true;
  }

  editProduitFini(PFini:ProduitFini){
    this.newPFini=false;
    this.currentPFini=PFini
    this.PFiniselected=Object.assign({},PFini)
    this.displayPFiniDialog=true
  }
  deleteProduitFini(produitfini: ProduitFini) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cette Produit Fini?',
      accept: () => {
        this.managePFiniService.deleteProduitFini(produitfini.id.valueOf()).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Produit Fini supprimée avec succès',
            });
            
            this.RefreshAllProduitFinis();
          },
         
        });
      },
    });
  }
}
