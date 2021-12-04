
import { HttpClient } from '@angular/common/http';
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
  public identity: any;
  currentYear: Date;
  public loading;
  public newN:any;
  public newP:any;
  public inProgressN:any;
  public inProgressP:any;
  public TreatedN:any;
  public TreatedP:any;
  public response:any;

  constructor(private _http: HttpClient,private _problemService: ProblemService, private router: Router) {
    this.identity = this._problemService.getIdentity();

    if (this.identity == null) {
      this.router.navigate(['/login']);
    } else {
    }
  }


  ngOnInit(): void {
   this.response = this._problemService.getType()
   this.newN = this.response["New"];
   this.newP = Math.ceil((this.response["New"]*100)/(this.response["New"]+this.response["Inprogress"]+this.response["Treated"]));
   this.inProgressN = this.response["Inprogress"];
   this.inProgressP = Math.ceil((this.response["Inprogress"]*100)/(this.response["New"]+this.response["Inprogress"]+this.response["Treated"]));
   this.TreatedN = this.response["Treated"];
   this.TreatedP = Math.ceil((this.response["Treated"]*100)/(this.response["New"]+this.response["Inprogress"]+this.response["Treated"]));
  }

}
