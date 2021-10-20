import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanPreviewPage } from './plan-preview.page';

const routes: Routes = [
  {
    path: '',
    component: PlanPreviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanPreviewPageRoutingModule {}
