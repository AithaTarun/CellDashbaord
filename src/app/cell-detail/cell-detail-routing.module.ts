import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CellDetailComponent} from "./cell-detail.component";

const routes: Routes =
  [
    {
      path: '',
      component: CellDetailComponent,
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CellDetailRoutingModule { }
