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
  constructor(private _problemservice: ProblemService,private router: Router) { }

  ngOnInit(): void {
    this.Rec = new Reclamation(1,'','','New',new Date());
  }
  onSubmit(){
    this._problemservice.create(this.Rec).subscribe(
      data=>{console.log(data);}
    );
    this.router.navigate(['/list'])}
    
}
