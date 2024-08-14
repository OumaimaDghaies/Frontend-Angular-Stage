import { ManageProduitFiniComponent } from './manageproduitfini.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ManageProduitFiniComponent }])],
    exports: [RouterModule]
})
export class ManageProduitFiniDataRoutingModule {}


