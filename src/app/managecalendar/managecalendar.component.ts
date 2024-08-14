import { Component,  OnInit, signal, computed} from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { ManageCalendarService } from './managecalendar.service';
import localeFr from '@angular/common/locales/fr';

@Component({
    selector: 'app-managecalendar',
    templateUrl: './managecalendar.component.html',
    styleUrls: ['./managecalendar.component.scss'],
    providers: [DatePipe, ManageCalendarService , MessageService, ConfirmationService],
    
})
export class ManageCalendarComponent implements OnInit {


  backendmessages:Message[]=[];
  errorbackend:boolean=false;
  loading:boolean;
    selectedYear: number;
    availableYears: number[];
    
    selectedDayDetails: string = '';

    months: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  monthNames: string[] = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 
    'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  dayNames: string[] = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  displayDialog: boolean = false;
  selectedDate: Date | null = null;

  constructor(private config: PrimeNGConfig, private managecalendarService: ManageCalendarService,
    private messageService: MessageService, private confirmationService: ConfirmationService,
    private translateService: TranslateService, private datePipe: DatePipe) { }

 

    showDialog(date: number | null): void {
      
        this.displayDialog = true;
      
    }

  daysInMonth( month: number, year: number): { date: number | null, day: string }[] {
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const firstWeekDay = firstDayOfMonth.getDay(); // 0 (Sunday) to 6 (Saturday)

    let days = [];
    let currentDay = 1;

    for (let i = 0; i < 42; i++) { // 42 days covers up to 6 weeks
      if (i < firstWeekDay || currentDay > daysInMonth) {
        days.push({ date: null, day: this.dayNames[i % 7] });
      } else {
        days.push({ date: currentDay, day: this.dayNames[i % 7] });
        currentDay++;
      }
      
    }

    return days;
  }
  
    ngOnInit() {
      registerLocaleData(localeFr);
         this.selectedYear = new Date().getFullYear(); 
         this.availableYears = this.generateYearRange(2000, 2024);
    }
    translate(lang: string) {
    }

    ngAfterViewInit(): void {
    }

    generateYearRange(start: number, end: number): number[] {
        return Array.from({ length: end - start + 1 }, (v, k) => start + k).reverse(); 
    }

    getInitialDate(month: number): Date {
        return new Date(this.selectedYear, month, 1);
    }


    isWeekend(dayName: string): boolean {
      return dayName === 'Sam' || dayName === 'Dim';
    }
    onYearSelectChange(): void {
    }







    

}
function moment(date: any) {
  throw new Error('Function not implemented.');
}

