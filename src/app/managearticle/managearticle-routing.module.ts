import { ManageArticleComponent } from './managearticle.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ManageArticleComponent }])],
    exports: [RouterModule]
})
export class ManageArticleDataRoutingModule {}


