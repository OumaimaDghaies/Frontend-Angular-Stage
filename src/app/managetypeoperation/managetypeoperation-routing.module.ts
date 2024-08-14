import { ManageTypeOperationComponent } from './managetypeoperation.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ManageTypeOperationComponent }])],
    exports: [RouterModule]
})
export class ManageTypeOperationDataRoutingModule {}


