import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes =
  [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },

    {
      path: 'dashboard',
      loadChildren: () => import('./dashboard/dashboard.module').then(module  => module.DashboardModule)
    },

    {
      path: 'cell/:id',
      loadChildren: () => import('./cell-detail/cell-detail.module').then(module  => module.CellDetailModule)
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule
{

}
