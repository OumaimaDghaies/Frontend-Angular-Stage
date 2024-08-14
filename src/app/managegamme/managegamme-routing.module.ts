import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ManageGammeComponent } from './managegamme.component';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ManageGammeComponent }])],
    exports: [RouterModule]
})
export class ManageGammeDataRoutingModule {}


