import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {CellDetailComponent} from "./cell-detail.component";
import {CellDetailRoutingModule} from "./cell-detail-routing.module";

@NgModule({
  imports:
    [
      CommonModule,
      CellDetailRoutingModule,
    ],

  exports:
    [
      CellDetailRoutingModule
    ],

  declarations:
    [
      CellDetailComponent
    ],

  providers: [],
})
export class CellDetailModule { }
