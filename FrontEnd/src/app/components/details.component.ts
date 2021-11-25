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
  loading: string;
  public admin=false;
  public employe=false;
  public user=false;

  constructor(private _problemservice: ProblemService,private _userService:ProblemService,private _route: ActivatedRoute,private router: Router) { }

  public problem : Reclamation;

  ngOnInit(): void {
    if(this._userService.getIdentity()['role']=='admin')
  this.admin= true
  else if(this._userService.getIdentity()['role']=='employe')
  this.employe= true
  else if(this._userService.getIdentity()['role']=='user')
  this.user= true
    this.getProblem();
    
  }

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

}
