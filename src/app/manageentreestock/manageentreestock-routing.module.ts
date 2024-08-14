import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ManageEntreeStockComponent } from './manageentreestock.component';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ManageEntreeStockComponent }])],
    exports: [RouterModule]
})
export class ManageEntreeStockDataRoutingModule {}


