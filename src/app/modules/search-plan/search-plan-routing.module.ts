import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPlanPage } from './search-plan.page';

const routes: Routes = [
  {
    path: '',
    component: SearchPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPlanPageRoutingModule {}
