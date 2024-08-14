import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ManageCalendarComponent } from './managecalendar.component';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ManageCalendarComponent }])],
    exports: [RouterModule]
})
export class ManageCalendarDataRoutingModule {}


