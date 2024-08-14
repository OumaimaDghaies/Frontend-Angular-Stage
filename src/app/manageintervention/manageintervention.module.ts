import { ManageInterventionDataRoutingModule } from './manageintervention-routing.module';
import { InterventionComponent } from './intervention.component';
import { ManageInterventionComponent } from './manageintervention.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
//import { PosModule } from '../../doc/splitter/splitterdoc.module';
import { TableModule } from 'primeng/table';
import { ButtonModule} from 'primeng/button';
import { ToolbarModule} from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MessagesModule } from 'primeng/messages';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ListboxModule } from 'primeng/listbox';


@NgModule({
    imports: [
        CommonModule, 
        FormsModule,
        ManageInterventionDataRoutingModule,
        TableModule,
        ButtonModule,
        ToolbarModule,
        DialogModule,
        ConfirmDialogModule,
        ToastModule,
        TabViewModule,
        InputNumberModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        ProgressSpinnerModule,
        InputSwitchModule,
        MessagesModule,
        ToggleButtonModule,
        CalendarModule,
        MultiSelectModule,
        OverlayPanelModule,
        ListboxModule
    ],
    declarations: [ManageInterventionComponent,InterventionComponent,]
})
export class ManageInterventionModule {}
