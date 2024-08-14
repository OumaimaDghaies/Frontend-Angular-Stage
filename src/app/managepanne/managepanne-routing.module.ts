import { ManagePanneComponent } from './managepanne.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ManagePanneComponent }])],
    exports: [RouterModule]
})
export class ManagePanneDataRoutingModule {}


