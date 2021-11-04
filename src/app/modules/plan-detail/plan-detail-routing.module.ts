import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanResolver } from 'src/app/core/resolvers/plan-resolver';

import { PlanDetailPage } from './plan-detail.page';

const routes: Routes = [
  {
    path: ':id',
    component: PlanDetailPage,
    resolve: {
      plan: PlanResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanDetailPageRoutingModule {}
