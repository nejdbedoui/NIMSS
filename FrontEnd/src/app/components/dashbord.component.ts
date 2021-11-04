import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent
} from "ng-apexcharts";
import { ProblemService } from '../services/problem.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
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
  
  constructor(private _problemService: ProblemService) {
    
    this._problemService.getType().subscribe(
      response => {
        this.chartOptions = {
          series: [response.New, response.Treated, response.Inprogress],
          chart: {
            type: "donut"
          },
          labels: ["New", "Treated", "Inprogress"],
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

  ngOnInit(): void {

  }

}
