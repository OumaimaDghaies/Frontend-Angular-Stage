import { ManageEmployeeComponent } from './manageemployee.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ManageEmployeeComponent }])],
    exports: [RouterModule]
})
export class ManageEmployeeDataRoutingModule {}


