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
        path: 'mi-perfil',
        loadChildren: () =>import('../modules/mi-perfil/mi-perfil.module').then((m) => m.MiPerfilPageModule),
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
        path: 'my-plans',
        loadChildren: () => import('../modules/my-plans/my-plans.module').then( m => m.MyPlansPageModule)
      },
      {
        path: 'edit-profile',
        loadChildren: () => import('../modules/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
