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
loading: string;
  public admin=false;
  public employe=false;
  public user=false;
  constructor(private _problemservice: ProblemService,private _rapportservice: RapportService,private _route: ActivatedRoute,private router: Router) {
    this.identity = _problemservice.getIdentity();
   }



  ngOnInit(): void {
    if(this._userService.getIdentity()['role']=='admin')
  this.admin= true
  else if(this._userService.getIdentity()['role']=='employe')
  this.employe= true
  else if(this._userService.getIdentity()['role']=='user')
  this.user= true
    this.getProblem();


    this._route.params.forEach((params: Params)=>{
      let idf = +params['id'];
     this.Report = new Rapport('',this.identity.id,idf);
      
      })

    };
  

  getProblem(){
    this.loading = 'show';
    this._route.params.forEach((params: Params)=>{
      let id = +params['id'];
      this._problemservice.getProblem(id).subscribe(value =>{
        this.problem = value['data'];
        console.log(value['data']);
        this.loading = 'hide';
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
