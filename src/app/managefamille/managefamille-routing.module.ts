import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ManageFamilleComponent } from './managefamille.component';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ManageFamilleComponent }])],
    exports: [RouterModule]
})
export class ManageFamilleDataRoutingModule {}


