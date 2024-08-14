import { registerLocaleData } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, LOCALE_ID, OnChanges,OnInit, Output } from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import * as XLSX from 'xlsx';
import { EntreeStock, DetailsEntreeStock} from './manageentreestock';
import { ManageEntreeStockService } from './manageentreestock.service'
import { MessageService } from 'primeng/api';
import { Date } from 'luxon';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-entreestock',
  templateUrl: './entreestock.component.html',
  //styleUrls: ['./importaccessfees.component.scss'],
  providers:[
    { provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
})
export class EntreeStockComponent implements OnInit, AfterViewInit{
  gridData: any[] = [];
  ExcelData:any;
  @Input() newentreestock:boolean;
  @Input() newdetailsentreestock:boolean;
  @Input() entreestock:EntreeStock;
  @Input() detailsentreestock:DetailsEntreeStock;
  @Output() entreestockeChange:EventEmitter<EntreeStock> =new EventEmitter<EntreeStock>(); 
  detailsEntreStockList: DetailsEntreeStock[] = [];
  
  @Input() saveE:Boolean;
  @Output() saveEChange:EventEmitter<boolean> =new EventEmitter<boolean>(); 

  checked: boolean = false;
  
  entreestockselected:EntreeStock=new EntreeStock();
  displayEntreeStockDialog:boolean=false;
  constructor(private manageentreestockService: ManageEntreeStockService,private messageService: MessageService) { }


  ngOnInit(): void {
    //console.log("yyy"+JSON.stringify(this.mileagecharges))
    registerLocaleData(localeFr);
    
  }

  ReadExcel(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e) => {
        var workBook = XLSX.read(fileReader.result, { type: 'binary' });
        var sheetNames = workBook.SheetNames;
        this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
        console.log(this.ExcelData);
        if (this.ExcelData.length > 0) {
            const newDetailsList = this.ExcelData.map((data: any) => {
                let details = new DetailsEntreeStock();
                details.codeArticle = data['codeArticle'] || '';
                details.codeProduitFini = data['codeProduitFini'] || '';
                details.numLot = data['numLot'] || '';
                details.qteListeColisage = data['qteListeColisage'] || 0;
                details.qteEntree = data['qteEntree'] || 0;
                details.qteRetour = data['qteRetour'] || 0;
                details.editable = false;
                return details;
            });
            this.detailsEntreStockList = [...this.detailsEntreStockList, ...newDetailsList];
            this.entreestock.listeDetailsEntreeStock=[...this.entreestock.listeDetailsEntreeStock,...newDetailsList];
  
        }
    };
}

addNewRow() {
  let newRow = new DetailsEntreeStock();
  newRow.editable = true; // Rend la nouvelle ligne éditable par défaut
  this.detailsEntreStockList = [...this.detailsEntreStockList, newRow ,new DetailsEntreeStock()];
}

/*
addNewRow() {
  this.detailsEntreStockList = [...this.detailsEntreStockList, new DetailsEntreeStock()];
}*/
  /*
  ReadExcel(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e) => {
      var workBook = XLSX.read(fileReader.result, { type: 'binary' });
      var sheetNames = workBook.SheetNames;
      this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
      console.log(this.ExcelData);
      if (this.ExcelData.length > 0) {
        const data = this.ExcelData[0];
        this.detailsentreestock.codeEntree = data['codeEntree'] || '';
        this.detailsentreestock.codeArticle = data['codeArticle'] || '';
        this.detailsentreestock.codeProduitFini = data['codeProduitFini'] || '';
        this.detailsentreestock.numLot = data['numLot'] || '';
        this.detailsentreestock.qteListeColisage = data['qteListeColisage'] || 0;
        this.detailsentreestock.qteEntree = data['qteEntree'] || 0;
        this.detailsentreestock.qteRetour = data['qteRetour'] || 0;
      }
    };
  }*/
  
 

  

  


  ngAfterViewInit(): void {
  }

  
  

  saveEntreeStock() {
    this.manageentreestockService.saveEntreeStock(this.entreestock, this.newentreestock)
      .subscribe({
        next: (data) => {  
          this.saveEChange.emit(true);
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Stock enregistré avec succès.' });
      
        },
        error: (error) => {
          // Handle error
        }
      });
  }
  

validateFields(): boolean {
  if (!this.entreestock.codeEntree || !this.entreestock.referenceCommandeClient || !this.entreestock.codeFournisseur ||
      !this.entreestock.codeSourceEntree || !this.entreestock.codeStatusEntree || !this.entreestock.dateColisage ||
      !this.entreestock.dateEntree) {
    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez remplir tous les champs du formulaire EntreeStock.' });
    return false;
  }
  return true;
}
}
