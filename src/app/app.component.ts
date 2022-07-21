import { Component } from '@angular/core';
import {CellService} from "./cell.service";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  public cellsInfo: any[] = [];
  public currentTab = '/dashboard';

  constructor(private cellsService: CellService, private router: Router)
  {
    cellsService.cellsInfoChange.subscribe
    (
      (data) =>
      {
        this.cellsInfo = data;
      }
    );

    this.router.events.subscribe
    (
      (r) =>
      {
        if (r instanceof NavigationEnd)
        {
          this.currentTab = r.url;
        }
      }
    )
  }
}
