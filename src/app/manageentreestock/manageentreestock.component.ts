import { Component,OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { EntreeStock, DetailsEntreeStock } from './manageentreestock';
import { ManageEntreeStockService } from './manageentreestock.service';
import { formatDate, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ConfirmEventType, ConfirmationService, LazyLoadEvent, Message, MessageService,PrimeNGConfig } from 'primeng/api';
import { EntreeStockComponent } from './entreestock.component';
import { TranslateService  } from '@ngx-translate/core';
import { Observable,forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manageentreestock',
  templateUrl: './manageentreestock.component.html',
  styleUrls: ['./manageentreestock.component.scss'],
  providers:[ManageEntreeStockService, MessageService, ConfirmationService, DatePipe ]
})
export class ManageEntreeStockComponent implements OnInit, AfterViewInit {

  @ViewChild(EntreeStockComponent) EntreeStock;
  
  listEntreeStock:EntreeStock[]=[]
  listDetailsEntreeStock:DetailsEntreeStock[]=[]
  loading:boolean;
  saveE:boolean
  entreestockselected:EntreeStock=new EntreeStock();
  currententreestock:EntreeStock=new EntreeStock();
  newentreestock:boolean=false;
  displayEntreeStockDialog:boolean=false;
  backendmessages:Message[]=[];
  errorbackend:boolean=false;

  detailsentreestockselected:DetailsEntreeStock=new DetailsEntreeStock();
  newdetailsentreestock:boolean=false;
  currentdetailsentreestock: DetailsEntreeStock;

  constructor(private config: PrimeNGConfig,private manageentreestockService: ManageEntreeStockService,private messageService: MessageService,
    private confirmationService: ConfirmationService,private translateService: TranslateService,
    private datePipe: DatePipe ) { }
    //
    //
  ngOnInit(): void {
    //console.log("ukhuh")
    registerLocaleData(localeFr);
    //this.translate('fr')
    //this.translateService.setDefaultLang('en');
    //this.loading = true;
    
  }

  translate(lang: string) {
    //lang='fr'
   /* this.translateService.use(lang);
    this.translateService.get('primeng').subscribe(res => { 
      JSON.stringify(res)
      this.config.setTranslation(res)});*/
  }

  getRandomInt(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ngAfterViewInit(): void {
    this.errorbackend=false;
    this.backendmessages=[]
    this.manageentreestockService.requestDataFromMultipleSources()
    .subscribe({
      next: (responseList) => {  
        //this.listterritories= responseList[0]
        //this.listdepartments=responseList[1]
        //this.listpayoffices=responseList[2]
        //this.listapprovallevel1employees=responseList[3]
        //this.listapprovallevel1employees.forEach(e=>{e.nomcomplet=e.nom + " " + e.prenom})
        //this.listapprovallevel1employees.sort((n1,n2)=> n1.nomcomplet > n2.nomcomplet ? 1 : -1)
        this.loading=false
    },
    error:(error)=>{
      this.errorbackend=true
      this.backendmessages = [{ severity: 'error', summary: 'Error', detail: 'Impossible de contacter le serveur!! Merci de contacter le support.' }];
      
      this.loading = false
    }})
  }

  RefreshAllEntreeStock(){
    this.loading = true;
    this.errorbackend=false;
    this.backendmessages=[]
    this.listEntreeStock=[]
    this.manageentreestockService.getAllEntreeStock()
    .subscribe({
      next: (responseList) => {  
        console.log(JSON.stringify(responseList))
        this.listEntreeStock= responseList
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
      if (this.newentreestock){
        this.listEntreeStock=[this.EntreeStock.entreestock ,...this.listEntreeStock]
      }
      else{
        Object.assign(this.currententreestock,JSON.parse(JSON.stringify(this.EntreeStock.entreestock)))
      }
    this.displayEntreeStockDialog=false;
    }
  }

  openNewEntreeStock(){
    //this.selectedmileagecharges=new MileageChargesHeader()
    this.entreestockselected=new EntreeStock();
    this.detailsentreestockselected =new DetailsEntreeStock();
    //this.employeeselected.heureDebutTravail=this.datePipe.transform(new Date(), 'yyyy-MM-dd') +" " + this.employeeselected.heureDebutTravail
    //console.log( this.employeeselected.heureDebutTravail)

    this.newentreestock=true;
    this.newdetailsentreestock=true;
    this.displayEntreeStockDialog=true;
  }

  editEntreeStock(entreestock:EntreeStock){
    this.newentreestock=false;
    this.currententreestock=entreestock
    this.entreestockselected=Object.assign({},entreestock)
    this.displayEntreeStockDialog=true
  }



  deleteEntreeStock(entreestock: EntreeStock) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cette Entrée Stock ?',
      accept: () => {
        this.manageentreestockService.deleteEntreeStock(entreestock.compteur.valueOf()).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Entrée Stock supprimée avec succès',
            });
            this.RefreshAllEntreeStock();
          },
         
        });
      },
    });
  }
 
}
