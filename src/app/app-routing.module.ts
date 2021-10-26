import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'plan-preview',
    loadChildren: () =>
      import('./core/components/plan-preview/plan-preview.module').then(
        (m) => m.PlanPreviewPageModule
      ),
  },
  {
    path: 'plan-view',
    loadChildren: () =>
      import('./modules/plan-view/plan-view.module').then(
        (m) => m.PlanViewPageModule
      ),
  },
  {
    path: 'iniciar-sesion',
    loadChildren: () =>
      import('./modules/iniciar-sesion/iniciar-sesion.module').then(
        (m) => m.IniciarSesionPageModule
      ),
  },
  {
    path: 'pop-over',
    loadChildren: () => import('./core/components/pop-over/pop-over.module').then( m => m.PopOverPageModule)
  },
];
  

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
