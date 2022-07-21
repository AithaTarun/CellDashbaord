import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';

import {ChartConfiguration, LegendItem} from "chart.js";
import Chart from 'chart.js/auto'
import {CellService} from "../cell.service";
import {formatNumber} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy
{
  @ViewChild("chart1") chart1Canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild("chart2") chart2Canvas!: ElementRef<HTMLCanvasElement>;

  public cellsInfo: any[] = [];

  private chart1: Chart | undefined;
  private chart2: Chart | undefined;

  constructor(private cellsService: CellService)
  {
    cellsService.getCells();

    this.cellsService.cellsInfoChange.subscribe
    (
      (data) =>
      {
        this.cellsInfo = data;

        this.drawGraphs();
      }
    );
  }

  drawGraphs()
  {
    const chart1Health = (this.cellsInfo[0].discharge_capacity / this.cellsInfo[0].nominal_capacity) * 100.0;
    const chart1HealthP = formatNumber(chart1Health, 'en-US', '2.2-2');
    const chart1HealthN = formatNumber(100.0 - chart1Health, 'en-US', '2.2-2');

    const chart1Config: ChartConfiguration =
      {
        type: 'pie',
        data:
          {
            datasets:
              [
                {
                  data: [chart1Health, 100.0 - chart1Health]
                }
              ]
          },
        options:
          {
            elements: {
              arc: {
                backgroundColor: ['#ff6384', '#feece0'],
                hoverBackgroundColor: ['#e45959', '#eedacc']
              }
            },

            plugins:
              {
                legend:
                  {
                    labels:
                      {
                        textAlign: "center",
                        generateLabels(chart: Chart): LegendItem[]
                        {
                          return [{text: chart1HealthP, datasetIndex: 0, fillStyle: '#ff6384'}, {text: chart1HealthN, datasetIndex: 0, fillStyle: '#feece0'}]
                        }
                      }
                  },

                title:
                  {
                    display: true,
                    position: 'bottom',
                    text: 'Cell - ' + this.cellsInfo[0].cell_id
                  }
              }
          }
      };

    const chart2Health = (this.cellsInfo[1].discharge_capacity / this.cellsInfo[1].nominal_capacity) * 100.0;
    const chart2HealthP = formatNumber(chart2Health, 'en-US', '2.2-2');
    const chart2HealthN = formatNumber(100.0 - chart2Health, 'en-US', '2.2-2');

    const chart2Config: ChartConfiguration =
      {
        type: 'pie',
        data:
          {
            datasets:
              [
                {
                  data: [chart2Health, 100.0 - chart2Health]
                }
              ]
          },
        options:
          {
            elements: {
              arc: {
                backgroundColor: ['#ffcd56', '#feece0'],
                hoverBackgroundColor: ['#fabf34', '#eedacc']
              }
            },

            plugins:
              {
                legend:
                  {
                    labels:
                      {
                        textAlign: "center",
                        generateLabels(chart: Chart): LegendItem[]
                        {
                          return [{text: chart2HealthP, datasetIndex: 0, fillStyle: '#ffcd56'}, {text: chart2HealthN, datasetIndex: 0, fillStyle: '#feece0'}]
                        }
                      }
                  },

                title:
                  {
                    display: true,
                    position: 'bottom',
                    text: 'Cell - ' + this.cellsInfo[1].cell_id
                  }
              }
          }
      }

     this.chart1 = new Chart(this.chart1Canvas.nativeElement, chart1Config);
     this.chart2 = new Chart(this.chart2Canvas.nativeElement, chart2Config);
  }

  ngOnDestroy()
  {
    this.chart1?.destroy();
    this.chart2?.destroy();
  }

}
