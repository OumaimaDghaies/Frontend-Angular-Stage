import { ManagePreparationComponent } from './managepreparation.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ManagePreparationComponent }])],
    exports: [RouterModule]
})
export class ManagePreparationDataRoutingModule {}


