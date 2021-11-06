import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProblemService } from '../services/problem.service';





@Component({
  selector: 'app-problem',
  templateUrl: '../views/problem.component.html',
  styleUrls: ['../css/problem.component.css'],
})
export class ProblemComponent implements OnInit {
  
  Test;
  public identity;
  public loading;

  constructor(private _problemservice: ProblemService,private router: Router) {
    this.identity = this._problemservice.getIdentity();
   }

  ngOnInit(): void {
    if(this.identity == null){
			this.router.navigate(['/login']);
		}else{
      console.log(this.identity);
      const ELEMENT_DATA: [] =this.Test;
    this.getList();
    
    }
  }
  getAll(){
  this._problemservice.getAll().subscribe(values=>{this.Test=values});
}
getList(){
  this.loading = 'show';
  const id=this._problemservice.getIdentity().id;
  this._problemservice.getList(id).subscribe(values=>{
    console.log(values[1].stat);
    if(values[1].stat=='success'){
    this.Test=values;
    console.log(this.Test);
    this.loading = 'hide';}});
  
}
}



