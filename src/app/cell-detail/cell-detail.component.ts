import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CellService} from "../cell.service";
import {catchError, throwError} from "rxjs";
import {ChartConfiguration} from "chart.js";
import Chart from "chart.js/auto";

@Component({
  selector: 'app-cell-detail',
  templateUrl: './cell-detail.component.html',
  styleUrls: ['./cell-detail.component.css']
})
export class CellDetailComponent implements OnInit, OnDestroy
{
  public cell_id: number | undefined;

  @ViewChild("chartvt") chartvtCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild("chartcut") chartcuCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild("charttt") chartttCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild("chartcat") chartcaCanvas!: ElementRef<HTMLCanvasElement>;

  public cellsInfo: any[] = [];

  private chartvt: Chart | undefined;
  private chartcut: Chart | undefined;
  private charttt: Chart | undefined;
  private chartcat: Chart | undefined;

  constructor(private route: ActivatedRoute, private cellService: CellService, private router: Router)
  {

  }

  ngOnInit(): void
  {
    this.route.params.subscribe
    (
      (param: Params)=>
      {
        this.cell_id = param['id'];

        this.cellService.getCellDetails(this.cell_id).pipe
        (
          catchError
          (
            async (error: any) =>
            {
              console.log(error);

              await this.router.navigate(['/']);

              return throwError('Error occurred');
            }
          )
        )
          .subscribe
          (
            // tslint:disable-next-line:no-shadowed-variable
            (response: any) =>
            {
              let currentData: any[] = response.currentData;
              let voltageData: any[] = response.voltageData;
              let timeData: any[] = response.timeData;
              let temperatureData: any[] = response.temperatureData;
              let capacityData: any[] = response.capacityData;

              currentData = currentData.map
              (
                (d) =>
                {
                  return Number(d);
                }
              );

              voltageData = voltageData.map
              (
                (d) =>
                {
                  return Number(d);
                }
              );

              timeData = timeData.map
              (
                (d) =>
                {
                  return new Date(d).getHours()
                }
              );

              capacityData = capacityData.map
              (
                (d) =>
                {
                  return Number(d);
                }
              );

              currentData = currentData.map
              (
                (d) =>
                {
                  return Number(d);
                }
              );

              const chartvtConfig: ChartConfiguration =
                {
                  type: 'line',
                  data:
                    {
                      labels: timeData,
                      datasets:
                        [
                          {
                            data: voltageData,
                            pointBorderColor: "rgba(220,220,220,1)",
                            pointBackgroundColor: "#fff",
                            borderColor: 'rgb(75, 192, 192)',
                            borderWidth: 2,
                            pointBorderWidth: 0,
                            pointRadius: 0,
                            pointHitRadius: 0,
                          }
                        ]
                    },
                  options:
                    {
                      plugins:
                        {
                          title:
                            {
                              display: true,
                              position: 'top',
                              text: 'Voltage vs Time'
                            },

                          legend:
                            {
                              display: false
                            }
                        }
                    }
                };

              const chartcutConfig: ChartConfiguration =
                {
                  type: 'line',
                  data:
                    {
                      labels: timeData,
                      datasets:
                        [
                          {
                            data: currentData,
                            pointBorderColor: "rgba(220,220,220,1)",
                            pointBackgroundColor: "#fff",
                            borderColor: 'rgb(75, 192, 192)',
                            borderWidth: 2,
                            pointBorderWidth: 0,
                            pointRadius: 0,
                            pointHitRadius: 0,
                          }
                        ]
                    },
                  options:
                    {
                      plugins:
                        {
                          title:
                            {
                              display: true,
                              position: 'top',
                              text: 'Current vs Time'
                            },

                          legend:
                            {
                              display: false
                            }
                        }
                    }
                };

              const chartttConfig: ChartConfiguration =
                {
                  type: 'line',
                  data:
                    {
                      labels: timeData,
                      datasets:
                        [
                          {
                            data: temperatureData,
                            pointBorderColor: "rgba(220,220,220,1)",
                            pointBackgroundColor: "#fff",
                            borderColor: 'rgb(75, 192, 192)',
                            borderWidth: 2,
                            pointBorderWidth: 0,
                            pointRadius: 0,
                            pointHitRadius: 0,
                          }
                        ]
                    },
                  options:
                    {
                      plugins:
                        {
                          title:
                            {
                              display: true,
                              position: 'top',
                              text: 'Temperature vs Time'
                            },

                          legend:
                            {
                              display: false
                            }
                        }
                    }
                };

              const chartcatConfig: ChartConfiguration =
                {
                  type: 'line',
                  data:
                    {
                      labels: timeData,
                      datasets:
                        [
                          {
                            data: capacityData,
                            pointBorderColor: "rgba(220,220,220,1)",
                            pointBackgroundColor: "#fff",
                            borderColor: 'rgb(75, 192, 192)',
                            borderWidth: 2,
                            pointBorderWidth: 0,
                            pointRadius: 0,
                            pointHitRadius: 0,
                          }
                        ]
                    },
                  options:
                    {
                      plugins:
                        {
                          title:
                            {
                              display: true,
                              position: 'top',
                              text: 'Capacity vs Time'
                            },

                          legend:
                            {
                              display: false
                            }
                        }
                    }
                };

              this.chartvt = new Chart(this.chartvtCanvas.nativeElement, chartvtConfig);
              this.chartcut = new Chart(this.chartcuCanvas.nativeElement, chartcutConfig);
              this.charttt = new Chart(this.chartttCanvas.nativeElement, chartttConfig);
              this.chartcat = new Chart(this.chartcaCanvas.nativeElement, chartcatConfig);
            }
          );

      }
    );
  }

  ngOnDestroy()
  {
    this.chartvt?.destroy();
    this.chartcut?.destroy();
    this.charttt?.destroy();
    this.chartcat?.destroy();
  }

}
