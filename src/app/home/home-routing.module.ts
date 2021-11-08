import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '',
        redirectTo: 'recommended-plans',
        pathMatch: 'full',
      },
      {
        path: 'create-plan',
        loadChildren: () =>
          import('../modules/plan-creation/plan-creation.module').then(
            (m) => m.PlanCreationPageModule
          ),
      },
      {
        path: 'edit-profile',
        loadChildren: () =>import('../modules/edit-profile/edit-profile.module').then((m) => m.EditProfilePageModule),
      },
      {
        path: 'search-plan',
        loadChildren: () => import('../modules/search-plan/search-plan.module').then( m => m.SearchPlanPageModule)
      },
      {
        path: 'recommended-plans',
        loadChildren: () => import('../modules/recommended-plans/recommended-plans.module').then( m => m.RecommendedPlansPageModule)
      },
      {
        path: 'iniciar-sesion',
        loadChildren: () => import('../modules/iniciar-sesion/iniciar-sesion.module').then( m => m.IniciarSesionPageModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
