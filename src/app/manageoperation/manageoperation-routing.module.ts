import { ManageOperationComponent } from './manageoperation.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ManageOperationComponent }])],
    exports: [RouterModule]
})
export class ManageOperationDataRoutingModule {}


