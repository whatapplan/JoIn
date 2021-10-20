import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanViewPage } from './plan-view.page';


const routes: Routes = [
  {
    path: '',
    component: PlanViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanViewPageRoutingModule {}
