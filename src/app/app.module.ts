import { ManageProduitFiniService } from './manageproduitfini/manageproduitfini.service';
import { ManageGammeService } from './managegamme/managegamme.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { ImportposfileComponent } from './importposfile/importposfile.component';

import { AppConfigService } from './service/appconfigservice';

//import { TableModule } from 'primeng/table';
//import {ButtonModule} from 'primeng/button';
//import {ToolbarModule} from 'primeng/toolbar';
import { RippleModule } from 'primeng/ripple';
//import { ImportAccessfeesComponent } from './accessfees/importaccessfees.component';
//import { PosComponent } from './pos/pos.component';
import { TabViewModule } from 'primeng/tabview';

import { AppMenuModule } from './menu/menu.module';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
//import { LoginComponent } from './login/login.component';
//import { BankinvoiceComponent } from './bankinvoice/bankinvoice.component';
//import { StationcommissionComponent } from './stationcommission/stationcommission.component';
//import { GabComponent } from './gab/gab.component';
//import { AccessfeesComponent } from './accessfees/accessfees.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import {MessageModule} from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
export function createHomeTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
import { ManageTypepanneService } from './managetypepanne/managetypepanne.service';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { errorInterceptorProviders } from './_helpers/error.interceptor';
import { AppTopbarModule } from './topbar/topbar.module';
//import { ManagecalendarComponent } from './managecalendar/managecalendar.component';
import { CalendarModule } from 'primeng/calendar';
import { ManageFamilleProduitFiniService } from './managefamilleproduitfini/managefamilleproduitfini.service';
import { ManageFamilleService } from './managefamille/managefamille.service';
import { ManageImmobilisationService } from './manageimmobilisation/manageimmobilisation.service';
import { ManageEmployeeService } from './manageemployee/manageemployee.service';
import { ManagePanneService } from './managepanne/managepanne.service';
import { ManagePreparationService } from './managepreparation/managepreparation.service';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ManageTypeMaterielService } from './managetypemateriel/managetypemateriel.service';
import { ManageTypeOperationService } from './managetypeoperation/managetypeoperation.service';
import { ManageOperationService } from './manageoperation/manageoperation.service';
@NgModule({
  declarations: [
    AppComponent,
    //ImportposfileComponent,
    //ImportAccessfeesComponent,
    //HomeComponent,
    MainComponent,
    //ManagecalendarComponent,
   // LoginComponent,
    //BankinvoiceComponent,
    //StationcommissionComponent,
    //GabComponent,
    //AccessfeesComponent,
    //PosComponent,
    
  ],
  imports: [
    FormsModule, ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AppMenuModule,
    CalendarModule,
    OverlayPanelModule,
    MultiSelectModule,
    //TableModule,
    //ButtonModule,
    //ToolbarModule,
    AppTopbarModule,
    RippleModule,
    TabViewModule,
    InputNumberModule,
    InputTextModule,
    MessageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createHomeTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  exports:[
    //AppMenuModule,
    //TableModule,
    //ButtonModule,
    //ToolbarModule
    RippleModule,
    TabViewModule,
    InputNumberModule,
    InputTextModule,
    MessageModule
  ],
  providers: [AppConfigService,authInterceptorProviders,errorInterceptorProviders, ManageGammeService,
     ManageFamilleProduitFiniService, ManageFamilleService,ManageTypepanneService,ManageImmobilisationService,
     ManagePreparationService,ManagePanneService,ManageEmployeeService, ManageTypeMaterielService, 
     ManageTypeOperationService, ManageOperationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
