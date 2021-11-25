
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import {
  ApexNonAxisChartSeries,
  ApexTitleSubtitle,
  ApexResponsive,
  ApexChart,
  ApexXAxis,
  ApexFill,
  ChartComponent,
  ApexStroke,
  ApexMarkers,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexTooltip
} from "ng-apexcharts";
import { ProblemService } from '../services/problem.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  series2:ApexAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  fill: ApexFill;
  markers: ApexMarkers;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  legend: ApexLegend;

};

@Component({
  selector: 'app-dashbord',
  templateUrl: '../views/dashbord.component.html',
  styleUrls: ['../css/dashbord.component.css'],
  providers: [ProblemService]
})
export class DashbordComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions>;
  public identity: any;
  currentYear: Date;



  constructor(private _problemService: ProblemService, private router: Router) {
    this.identity = this._problemService.getIdentity();

    if (this.identity == null) {
      this.router.navigate(['/login']);
    } else {

      this._problemService.getType().subscribe(
        response => {
          this.chartOptions = {
            series: [response['New'], response['Inprogress'], response['Treated']],
            chart: {
              type: "donut"
            },
            labels: ["New", "Inprogress", "Treated"],
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },

                  legend: {
                    position: "bottom"
                  }
                }
              }
            ]
          };
        });

    }
    this._problemService.getType().subscribe(
      response => {
        this.chartOptions2 = {
          series: [],
          chart: {
            type: "bar",
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "55%",
              
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ["transparent"]
          },
          xaxis: {
            categories: [
              "Janv",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec"
            ]
          },
          yaxis: {
            title: {
              text: "$ (thousands)"
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return "$ " + val + " thousands";
              }
            }
          }
        };
      })
  }


  ngOnInit(): void {

  }

}
