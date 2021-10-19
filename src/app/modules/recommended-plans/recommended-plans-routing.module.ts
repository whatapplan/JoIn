import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecommendedPlansPage } from './recommended-plans.page';

const routes: Routes = [
  {
    path: '',
    component: RecommendedPlansPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecommendedPlansPageRoutingModule {}
