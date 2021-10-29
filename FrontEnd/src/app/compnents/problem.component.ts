import { Component, OnInit } from '@angular/core';
import { Reclamation } from '../models/reclamation';
import { ProblemService } from '../services/problem.service';


@Component({
  selector: 'app-problem',
  templateUrl: '../views/problem.component.html',
})
export class ProblemComponent implements OnInit {
  Test;
  public Rec:Reclamation;
  rectest:Reclamation;
  constructor(private _problemservice: ProblemService) { }

  ngOnInit(): void {
    
    this.getNew();
    this.Rec = new Reclamation(1,'','','New',new Date());
  }
  getNew(){
  this._problemservice.getNew().subscribe(values=>{this.Test=values,console.log(this.Test[0])});
  
  
}
onSubmit(){
  this._problemservice.create(this.Rec).subscribe(
    data=>{console.log(data);}
  );
  
}



}
