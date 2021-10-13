import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanCreationPage } from './plan-creation.page';

const routes: Routes = [
  {
    path: '',
    component: PlanCreationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanCreationPageRoutingModule {}
