import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RapportService } from 'NIMSS/FrontEnd/src/app/services/rapport.service';
import { Rapport } from '../models/rapport';
import { Reclamation } from '../models/reclamation';
import { ProblemService } from '../services/problem.service';

@Component({
  selector: 'app-details',
  templateUrl: '../views/details.component.html',
  styleUrls: ['../css/details.component.css']
})
export class DetailsComponent implements OnInit {
  public problem : Reclamation;
  public Report : Rapport;
  public identity;
  public id;

  constructor(private _problemservice: ProblemService,private _rapportservice: RapportService,private _route: ActivatedRoute,private router: Router) {
    this.identity = _problemservice.getIdentity();
   }


  ngOnInit(): void {
    this.getProblem();
    console.log(this.identity.id);

    this._route.params.forEach((params: Params)=>{
      let idf = +params['id'];
     this.Report = new Rapport('',this.identity.id,idf);
      
      })

    };
  

  getProblem(){
    this._route.params.forEach((params: Params)=>{
      let id = +params['id'];
      this._problemservice.getProblem(id).subscribe(value =>{
        this.problem = value['data'];
        console.log(value['data']);
      })

    });
    
  }
  update(){
    this._problemservice.updateProblem(this.problem).subscribe(value=>{
      console.log(value);
      this.router.navigate(['/list']);
    });
  }

  
onSubmit(){

this._problemservice.createReport(this.Report).subscribe(value=>{
  console.log(value);
})
}
}
