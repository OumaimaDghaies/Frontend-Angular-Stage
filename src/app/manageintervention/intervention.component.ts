import { ManageInterventionService } from './manageintervention.service';
import { Employee, Intervention, Panne, Preparation, Immobilisation, Operation } from './manageintervention';
import { registerLocaleData } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  LOCALE_ID,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import localeFr from '@angular/common/locales/fr';

import * as XLSX from 'xlsx';
import { MessageService } from 'primeng/api';
import { DateTime } from 'luxon';
import { ManageImmobilisationService } from '../manageimmobilisation/manageimmobilisation.service';
import { ManageEmployeeService } from '../manageemployee/manageemployee.service';
import { ManagePanneService } from '../managepanne/managepanne.service';
import { ManagePreparationService } from '../managepreparation/managepreparation.service';
import { ManageOperationService } from '../manageoperation/manageoperation.service';
@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  //styleUrls: ['./importaccessfees.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
})
export class InterventionComponent implements OnInit, AfterViewInit {
  
  @Input() newIntervention: boolean;

  @Input() intervention: Intervention;
  @Output() InterventionChange: EventEmitter<Intervention> =
    new EventEmitter<Intervention>();

  @Input() saveE: Boolean;
  @Output() saveEChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  checked: boolean = false;
  immobilisation: Immobilisation[] = [];
  employee: Employee[] = [];
  panne: Panne[] = [];
  preparation: Preparation[] = [];
  operation: Operation[] = [];
  visibleTable: string = '';

  

  /*employeeNames: { codeEmployee: String, libelleEmployee: String }[] = [];
  showEmployeeTable: boolean = false;
  immobilisationNames: { designation: String, numSerie: String }[] = [];
  showImmobilisationTable: boolean = false;
  preparationNames: {  libellePreparation: String }[] = [];
  showPreparationTable: boolean = false;
  panneNames: { libellePanne: String  }[] = [];
  showPanneTable: boolean = false;
  operationNames: { codeOperation: String, libelleOperation: String }[] = [];
  showOperationTable: boolean = false;
*/
  selectedImmobilisation: Immobilisation;
  selectedEmployee: Employee;
  selectedPanne: Panne[] = [];
  selectedPreparation: Preparation[] = [];
  //selectedPanne: Panne;
  //selectedPreparation: Preparation;
  selectedOperation: Operation;



  constructor(
    private manageInterventionService: ManageInterventionService,
    private messageService: MessageService,
    private manageImmobilisationService: ManageImmobilisationService,
    private manageEmployeeService: ManageEmployeeService,
    private managePanneService: ManagePanneService,
    private managePreparationService: ManagePreparationService,
    private manageOperationService:ManageOperationService
  ) {}

  ngOnInit(): void {
    //console.log("yyy"+JSON.stringify(this.mileagecharges))
    registerLocaleData(localeFr);
    this.loadEmployee();
    this.loadImmobilisation();
    this.loadPanne();
    this.loadPreparation();
    this.initializeIntervention();
    this.loadOperation();
    /*
    this.selectedImmobilisation = new Immobilisation();
    this.selectedEmployee = new Employee();
    this.selectedPreparation= new Preparation();
    this.selectedPanne= new Panne();
    this.selectedOperation= new Operation();*/
  }
  initializeIntervention() {
    if (!this.intervention) {
      this.intervention = new Intervention();
    }
    if (!this.intervention.employee) {
      this.intervention.employee = new Employee();
    }
    if (!this.intervention.immobilisation) {
      this.intervention.immobilisation = new Immobilisation();
    }
    if (!this.intervention.preparation) {
      this.intervention.preparation =[];
    }
    if (!this.intervention.panne) {
      this.intervention.panne = [];
    }
    if (!this.intervention.operation) {
      this.intervention.operation = new Operation();
    }
  }

  ngAfterViewInit(): void {}

  saveIntervention() {
    this.initializeIntervention();
  
    // Handle single selections
    if (this.selectedOperation) {
      this.intervention.operation.compteur = this.selectedOperation.compteur;
    } else {
      console.error('Selected Operation is undefined.');
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez sélectionner une Operation.' });
      return;
    }
  
    if (this.selectedImmobilisation) {
      this.intervention.immobilisation.compteur = this.selectedImmobilisation.compteur;
    } else {
      console.error('Selected immobilisation is undefined.');
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez sélectionner une immobilisation.' });
      return;
    }
  //
    if (this.selectedPreparation.length > 0) {
      this.intervention.preparation = this.selectedPreparation; // Assuming you want to store the first selected preparation
      //this.intervention.preparation.compteur = this.selectedPreparation.compteur;
    } else {
      console.error('Selected preparation is undefined.');
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez sélectionner une preparation.' });
      return;
    }
  
    if (this.selectedEmployee) {
      this.intervention.employee.compteur = this.selectedEmployee.compteur;
    } else {
      console.error('Selected employee is undefined.');
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez sélectionner un employé.' });
      return;
    }
  
    if (this.selectedPanne.length > 0) {
      this.intervention.panne = this.selectedPanne; // Assuming you want to store the first selected panne
    } else {
      console.error('Selected panne is undefined.');
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez sélectionner une panne.' });
      return;
    }
  
    this.manageInterventionService.saveIntervention(this.intervention).subscribe({
      next: (data) => {
        this.InterventionChange.emit(this.intervention);
        this.saveEChange.emit(true);
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Type Intervention enregistré avec succès.' });
      },
      error: (error) => {
        console.error('Error saving Intervention:', error);
      },
    });
  }
  
  loadOperation(): void {
    this.manageOperationService.getAllOperation().subscribe({
      next: (data) => {
        this.operation = data;
        //this.operationNames = this.operation.map(emp => ({ codeOperation: emp.codeOperation, libelleOperation: emp.libelleOperation }));
      
      },
      error: (error) => {
        console.error('Error fetching operation:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch operation.',
        });
      },
    });
  }

  

  loadImmobilisation(): void {
    this.manageImmobilisationService.getAllImmobilisation().subscribe({
      next: (data) => {
        this.immobilisation = data;
        //this.immobilisationNames = this.immobilisation.map(emp => ({ designation: emp.designation, numSerie: emp.numSerie }));
      
      },
      error: (error) => {
        console.error('Error fetching immobilisations:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch immobilisations.',
        });
      },
    });
  }

  
  loadEmployee(): void {
    this.manageEmployeeService.getAllEmployee().subscribe({
      next: (data) => {
        // Filtrer les employés avec monitrice === true
        this.employee = data.filter(emp => emp.monitrice === true);
        // Mapper uniquement les employés filtrés vers employeeNames
        //this.employeeNames = this.employee.map(emp => ({ codeEmployee: emp.codeEmployee, libelleEmployee: emp.libelleEmployee }));
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch employees.',
        });
      },
    });
  }

  
  loadPanne(): void {
    this.managePanneService.getAllPanne().subscribe({
      next: (data) => {
        this.panne = data;
        //this.panneNames = this.panne.map(emp => ({ libellePanne: emp.libellePanne }));
      
     
      },
      error: (error) => {
        console.error('Error fetching pannes:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch pannes.',
        });
      },
    });
  }

  showTable(table: string) {
    this.visibleTable = table;
  }
  selectImmobilisation(immobilisation: Immobilisation) {
    this.selectedImmobilisation = immobilisation;
    this.visibleTable = '';
  }

  selectEmployee(employee: Employee) {
    this.selectedEmployee = employee;
    this.visibleTable = '';
  }

  selectOperation(operation: Operation) {
    this.selectedOperation = operation;
    this.visibleTable = '';
  }
/*
  selectImmobilisation(immobilisation: { designation: String, numSerie: String }) {
    this.intervention.immobilisation.designation = immobilisation.designation;
    this.intervention.immobilisation.numSerie = immobilisation.numSerie;
    this.showImmobilisationTable = false; // Cacher le tableau après sélection
  }
  selectEmployee(employee: { codeEmployee: String, libelleEmployee: String }) {
    this.intervention.employee.libelleEmployee = employee.libelleEmployee;
    this.intervention.employee.codeEmployee = employee.codeEmployee;
    this.showEmployeeTable = false; // Cacher le tableau après sélection
  }
  selectOperation(operation: { codeOperation: String, libelleOperation: String }) {
    this.intervention.operation.codeOperation = operation.codeOperation;
    this.intervention.operation.libelleOperation = operation.libelleOperation;
    this.showOperationTable = false; // Cacher le tableau après sélection
  }
  selectPanne(panne: {  libellePanne: String }) {
    this.intervention.panne.libellePanne = panne.libellePanne;
    this.showPanneTable = false; // Cacher le tableau après sélection
  }

  selectPreparation(preparation: { libellePreparation: String }) {
    this.intervention.preparation.libellePreparation = preparation.libellePreparation;
    this.showPreparationTable = false; // Cacher le tableau après sélection
  }
*/
  loadPreparation(): void {
    this.managePreparationService.getAllPreparation().subscribe({
      next: (data) => {
        this.preparation = data;
        //this.preparationNames = this.preparation.map(emp => ({ libellePreparation: emp.libellePreparation }));
      
        console.log('Preparation Data:', this.preparation);
      },
      error: (error) => {
        console.error('Error fetching preparations:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch preparations.',
        });
      },
    });
  }
}