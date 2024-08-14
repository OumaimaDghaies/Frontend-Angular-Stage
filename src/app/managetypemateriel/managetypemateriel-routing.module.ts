import { ManageTypeMaterielComponent } from './managetypemateriel.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ManageTypeMaterielComponent }])],
    exports: [RouterModule]
})
export class ManageTypeMaterielDataRoutingModule {}


