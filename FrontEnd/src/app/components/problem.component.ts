import { Component, OnInit, ViewChild } from '@angular/core';
import { ProblemService } from '../services/problem.service';





@Component({
  selector: 'app-problem',
  templateUrl: '../views/problem.component.html',
})
export class ProblemComponent implements OnInit {
  
  Test;
  constructor(private _problemservice: ProblemService) {
  
   }

  ngOnInit(): void {
    this.getNew();
  }
  getNew(){
  this._problemservice.getNew().subscribe(values=>{this.Test=values});
}

}



