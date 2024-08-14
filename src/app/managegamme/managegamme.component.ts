import { ManageGammeService } from './managegamme.service';
import { Component,OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Gamme} from './managegamme';

import { formatDate, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ConfirmEventType, ConfirmationService, LazyLoadEvent, Message, MessageService,PrimeNGConfig } from 'primeng/api';
import { GammeComponent } from './gamme.component';
import { TranslateService  } from '@ngx-translate/core';
import { Observable,forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-managegamme',
  templateUrl: './managegamme.component.html',
  styleUrls: ['./managegamme.component.scss'],
  providers:[ManageGammeService, MessageService, ConfirmationService, DatePipe ]
})
export class ManageGammeComponent implements OnInit, AfterViewInit {

  @ViewChild(GammeComponent) Gamme;
  
  listgammes:Gamme[]=[]
  loading:boolean;
  saveE:boolean
  gammeselected:Gamme=new Gamme();
  currentgamme:Gamme=new Gamme();
  newgamme:boolean=false;
  displayGammeDialog:boolean=false;
  backendmessages:Message[]=[];
  errorbackend:boolean=false;



  constructor(private config: PrimeNGConfig,private managegammeService: ManageGammeService,private messageService: MessageService,
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
    this.managegammeService.requestDataFromMultipleSources()
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

  RefreshAllGammes(){
    this.loading = true;
    this.errorbackend=false;
    this.backendmessages=[]
    this.listgammes=[]
    this.managegammeService.getAllGamme()
    .subscribe({
      next: (responseList) => {  
        this.listgammes= responseList
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
      if (this.newgamme){
        this.listgammes=[this.Gamme.gamme ,...this.listgammes]
      }
      else{
        Object.assign(this.currentgamme,JSON.parse(JSON.stringify(this.Gamme.gamme)))
      }
    this.displayGammeDialog=false;
    }
  }

  openNewGamme(){
    //this.selectedmileagecharges=new MileageChargesHeader()
    this.gammeselected=new Gamme();
    
    
    this.newgamme=true;
    this.displayGammeDialog=true;
  }

  editGamme(gamme:Gamme){
    this.newgamme=false;
    this.currentgamme=gamme
    this.gammeselected=Object.assign({},gamme)
    this.displayGammeDialog=true
  }

  deleteGamme(gamme: Gamme) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cette famille?',
      accept: () => {
        this.managegammeService.deleteGamme(gamme.compteur.valueOf()).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Famille supprimée avec succès',
            });
            
            this.RefreshAllGammes();
          },
         
        });
      },
    });
  }
}
