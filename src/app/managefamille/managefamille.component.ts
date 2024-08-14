import { Component,OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Famille, SousFamille} from './managefamille';
import { ManageFamilleService } from './managefamille.service';
import { formatDate, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ConfirmEventType, ConfirmationService, LazyLoadEvent, Message, MessageService,PrimeNGConfig } from 'primeng/api';
import { FamilleComponent } from './famille.component';
import { TranslateService  } from '@ngx-translate/core';
import { Observable,forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';


@Component({
  selector: 'app-managefamille',
  templateUrl: './managefamille.component.html',
  styleUrls: ['./managefamille.component.scss'],
  providers:[ManageFamilleService, MessageService, ConfirmationService, DatePipe ]
})
export class ManageFamilleComponent implements OnInit, AfterViewInit {

  @ViewChild(FamilleComponent) Famille;
  
  listfamilles:Famille[]=[]
  loading:boolean;
  saveE:boolean
  familleselected:Famille=new Famille();
  currentfamille:Famille=new Famille();
  newfamille:boolean=false;
  displayFamilleDialog:boolean=false;

  listsousfamilles:SousFamille[]=[]
  sousfamilleselected:SousFamille=new SousFamille();
  currentsousfamille:SousFamille=new SousFamille();
  newsousfamille:boolean=false;
  displaySousFamilleDialog:boolean=false;
  
  backendmessages:Message[]=[];
  errorbackend:boolean=false;
  familles!: Famille[];
  sousfamilles!: SousFamille[];
  expandedRows= {};
  

  clonedSousFamille: { [s: string]: SousFamille } = {};

  constructor(private config: PrimeNGConfig,private managefamilleService: ManageFamilleService,private messageService: MessageService,
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

 
  onRowExpand(event: TableRowExpandEvent) {
    this.messageService.add({ severity: 'info', summary: 'Family Expanded', detail: event.data.id, life: 3000 });
}
onRowCollapse(event: TableRowCollapseEvent) {
  this.messageService.add({ severity: 'success', summary: 'Family Collapsed', detail: event.data.id, life: 3000 });
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
    this.managefamilleService.requestDataFromMultipleSources()
    .subscribe({
      next: (responseList) => {  
        //this.listsousfamilles= responseList[0]
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

  RefreshAllFamilles(){
    this.loading = true;
    this.errorbackend=false;
    this.backendmessages=[]
    this.listfamilles=[]
    this.managefamilleService.getAllFamilles()
    .subscribe({
      next: (responseList) => {  
        console.log(JSON.stringify(responseList))
        this.listfamilles= responseList
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
      if (this.newfamille){
        this.listfamilles=[this.Famille.famille ,...this.listfamilles]
      }
      else{
        Object.assign(this.currentfamille,JSON.parse(JSON.stringify(this.Famille.famille)))
      }
    this.displayFamilleDialog=false;
    }
  }
  
  

  openNewFamille(){
    //this.selectedmileagecharges=new MileageChargesHeader()
    this.familleselected=new Famille();
    
    //this.employeeselected.heureDebutTravail=this.datePipe.transform(new Date(), 'yyyy-MM-dd') +" " + this.employeeselected.heureDebutTravail
    //console.log( this.employeeselected.heureDebutTravail)
    this.newsousfamille=true;
    this.newfamille=true;
    this.displayFamilleDialog=true;

    
  }

  
  editFamille(famille:Famille){
    this.newfamille=false;
    this.currentfamille=famille
    this.familleselected=Object.assign({},famille)
    this.displayFamilleDialog=true
  }

  editSousFamille(sousfamille:SousFamille){
    this.newsousfamille=false;
    this.currentsousfamille=sousfamille
    this.sousfamilleselected=Object.assign({},sousfamille)
    
  }

  onRowEditSave(sousfamille: SousFamille) {
    
        delete this.clonedSousFamille[sousfamille.idsousfamille as unknown as string];
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Family is updated' });
    
}
  onRowEditCancel(sousfamille: SousFamille, index: number) {
    this.sousfamilles[index] = this.clonedSousFamille[sousfamille.idsousfamille as unknown as string];
    delete this.clonedSousFamille[sousfamille.idsousfamille as unknown as string];
}

onRowEditInit(sousfamille: SousFamille) {
  this.clonedSousFamille[sousfamille.idsousfamille as unknown as string] = { ...sousfamille };
}

deleteFamille(famille: Famille) {
  this.confirmationService.confirm({
    message: 'Êtes-vous sûr de vouloir supprimer cette famille?',
    accept: () => {
      this.managefamilleService.deleteFamille(famille.id.valueOf()).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Famille supprimée avec succès',
          });
          
          this.RefreshAllFamilles();
        },
       
      });
    },
  });
}




}

