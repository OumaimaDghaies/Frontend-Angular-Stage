import { ManageInterventionComponent } from './manageintervention.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ManageInterventionComponent }])],
    exports: [RouterModule]
})
export class ManageInterventionDataRoutingModule {}


