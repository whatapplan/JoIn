import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'create-plan',
        loadChildren: () =>
          import('../modules/plan-creation/plan-creation.module').then(
            (m) => m.PlanCreationPageModule
          ),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('../modules/register/register.module').then(
            (m) => m.RegisterPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
