import { ManageImmobilisationComponent } from './manageimmobilisation.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ManageImmobilisationComponent }])],
    exports: [RouterModule]
})
export class ManageImmobilisationDataRoutingModule {}


