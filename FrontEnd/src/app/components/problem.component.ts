import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProblemService } from '../services/problem.service';





@Component({
  selector: 'app-problem',
  templateUrl: '../views/problem.component.html',
})
export class ProblemComponent implements OnInit {
  
  Test;
  public identity;
  constructor(private _problemservice: ProblemService,private router: Router) {
    this.identity = this._problemservice.getIdentity();
   }

  ngOnInit(): void {
    if(this.identity == null){
			this.router.navigate(['/login']);
		}else{
      console.log(this.identity);
    this.getList();
    }
  }
  getAll(){
  this._problemservice.getAll().subscribe(values=>{this.Test=values});
}
getList(){
  const id=this._problemservice.getIdentity().id;
  this._problemservice.getList(id).subscribe(values=>{this.Test=values});
  
}
}



