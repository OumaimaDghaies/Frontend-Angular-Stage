import { ManageTypepanneComponent } from './managetypepanne.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ManageTypepanneComponent }])],
    exports: [RouterModule]
})
export class ManageTypepanneDataRoutingModule {}


