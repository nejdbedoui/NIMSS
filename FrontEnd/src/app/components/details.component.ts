import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Reclamation } from '../models/reclamation';
import { ProblemService } from '../services/problem.service';

@Component({
  selector: 'app-details',
  templateUrl: '../views/details.component.html',
  styleUrls: ['../css/details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private _problemservice: ProblemService,private _route: ActivatedRoute) { }

  public problem : Reclamation;

  ngOnInit(): void {
    this.getProblem();
  }

  getProblem(){
    this._route.params.forEach((params: Params)=>{
      let id = +params['id'];
      this._problemservice.getProblem(id).subscribe(value =>{
        this.problem = value['data'];
        console.log(value['data']);
      })

    });
    
  }

}
