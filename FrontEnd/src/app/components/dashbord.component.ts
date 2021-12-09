
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

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
import { Rapport } from '../models/rapport';
import { Reclamation } from '../models/reclamation';
import { ProblemService } from '../services/problem.service';
import { RapportService } from '../services/rapport.service';


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  series2: ApexAxisChartSeries;
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
  public newN: any;
  public newP: any;
  public inProgressN: any;
  public inProgressP: any;
  public treatedN: any;
  public treatedP: any;
  public response: any;
  public ticket;
  public ticketToShow;
  timerSubscription: any;
  public ratingToShow;
  public rating;
  data1: any;

  constructor(private _http: HttpClient, private _problemService: ProblemService, private router: Router, private _rapportService: RapportService,) {
    this.identity = this._problemService.getIdentity();

    if (this.identity == null) {
      this.router.navigate(['/login']);
    } else {

    }
  }


  ngOnInit(): void {
    this._problemService.getType().subscribe(value => {
      this.newN = value["New"];
      this.inProgressN = value["Inprogress"];
      this.treatedN = value["Treated"];
      this.newP = Math.floor((this.newN * 100) / (this.newN + this.inProgressN + this.treatedN));
      this.inProgressP = Math.floor((this.inProgressN * 100) / (this.newN + this.inProgressN + this.treatedN));
      this.treatedP = Math.floor((this.treatedN * 100) / (this.newN + this.inProgressN + this.treatedN));
    });


    this._rapportService.getallrep().subscribe(data => {
      this.ticket = Object.values(data)
      this.ticketToShow = this.ticket.slice(0, 5)
      console.log(this.ticket);
    })

    setInterval(() => {
      this.ticket = _.shuffle(this.ticket);
      this.ticketToShow = this.ticket.slice(0, 5)
    }, 20000);




    this._rapportService.getmoyrating().subscribe(data => {
      this.data1 = ((data["data"]))
      this.rating = Object.values(this.data1)
      console.log(this.rating);
      this.ratingToShow = this.rating.slice(0, 5)
    })

    setInterval(() => {
      this.rating = _.shuffle(this.rating);
      this.ratingToShow = this.rating.slice(0, 5)
    }, 20000);



  }
}
