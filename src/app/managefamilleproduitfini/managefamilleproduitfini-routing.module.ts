import { ManageFamilleProduitFiniComponent } from './managefamilleproduitfini.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ManageFamilleProduitFiniComponent }])],
    exports: [RouterModule]
})
export class ManageFamilleProduitFiniDataRoutingModule {}


