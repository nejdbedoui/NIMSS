import { Component, OnInit } from '@angular/core';
import { Reclamation } from '../models/reclamation';
import { ProblemService } from '../services/problem.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-createproblem',
  templateUrl: '../views/createproblem.component.html',
  styleUrls: ['../css/createproblem.component.css']
})
export class CreateproblemComponent implements OnInit {
  public Rec:Reclamation;
  rectest:Reclamation;
  public identity: any;
  constructor(private _problemservice: ProblemService,private router: Router) {
    this.identity = this._problemservice.getIdentity();
   }


  ngOnInit(): void {
    if(this.identity == null){
			this.router.navigate(['/login']);
		}else{
    this.Rec = new Reclamation(1,'','','New',new Date());
  }}
  onSubmit(){
    if(this.identity == null){
			this.router.navigate(['/login']);
		}else{
    this._problemservice.create(this.Rec).subscribe(
      data=>{console.log(data);}
    );
    this.router.navigate(['/list'])}
  }
}
