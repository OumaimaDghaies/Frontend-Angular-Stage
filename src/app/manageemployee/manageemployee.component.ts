import { EmployeeComponent } from './employee.component';
import { ManageEmployeeService } from './manageemployee.service';
import { Component,OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Employee} from './manageemployee';

import { formatDate, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ConfirmEventType, ConfirmationService, LazyLoadEvent, Message, MessageService,PrimeNGConfig } from 'primeng/api';

import { TranslateService  } from '@ngx-translate/core';
import { Observable,forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-manageemployee',
  templateUrl: './manageemployee.component.html',
  styleUrls: ['./manageemployee.component.scss'],
  providers:[ManageEmployeeService, MessageService, ConfirmationService, DatePipe ]
})
export class ManageEmployeeComponent implements OnInit, AfterViewInit {

  @ViewChild(EmployeeComponent) Employee;
  
  listEmployee:Employee[]=[]
  loading:boolean;
  saveE:boolean
  Employeeselected:Employee=new Employee();
  currentEmployee:Employee=new Employee();
  newEmployee:boolean=false;
  displayEmployeeDialog:boolean=false;
  backendmessages:Message[]=[];
  errorbackend:boolean=false;



  constructor(private config: PrimeNGConfig,private manageEmployeeService: ManageEmployeeService,private messageService: MessageService,
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
    this.manageEmployeeService.requestDataFromMultipleSources()
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

  RefreshAllEmployee(){
    this.loading = true;
    this.errorbackend=false;
    this.backendmessages=[]
    this.listEmployee=[]
    this.manageEmployeeService.getAllEmployee()
    .subscribe({
      next: (responseList) => {  
        this.listEmployee= responseList
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
      if (this.newEmployee){
        this.listEmployee=[this.Employee.employee ,...this.listEmployee]
      }
      else{
        Object.assign(this.currentEmployee,JSON.parse(JSON.stringify(this.Employee.employee)))
      }
    this.displayEmployeeDialog=false;
    }
  }

  openNewEmployee(){
    //this.selectedmileagecharges=new MileageChargesHeader()
    this.Employeeselected=new Employee();
    
    
    this.newEmployee=true;
    this.displayEmployeeDialog=true;
  }

  editEmployee(employee:Employee){
    this.newEmployee=false;
    this.currentEmployee=employee
    this.Employeeselected=Object.assign({},employee)
    this.displayEmployeeDialog=true
  }

  deleteEmployee(employee: Employee) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cette employee?',
      accept: () => {
        this.manageEmployeeService.deleteEmployee(employee.compteur.valueOf()).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Employee supprimée avec succès',
            });
            
            this.RefreshAllEmployee();
          },
         
        });
      },
    });
  }


}



