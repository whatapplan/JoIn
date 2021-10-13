import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'create-plan',
    pathMatch: 'full'
  },
  {
    path: 'create-plan',
    loadChildren: () =>
      import('./modules/plan-creation/plan-creation.module').then(
        (m) => m.PlanCreationPageModule
      ),
  },  {
    path: 'register',
    loadChildren: () => import('./modules/register/register.module').then( m => m.RegisterPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
