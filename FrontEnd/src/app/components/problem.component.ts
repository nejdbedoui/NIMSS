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
      
     if(this._problemservice.getIdentity()['role']=='user')
    this.getList();
    else
    this.getAll();
    }
  }
  getAll(){
    this.loading = 'show';
    
  this._problemservice.getAll().subscribe(values=>{
    console.log(values[0].stat);
    if(values[0].stat=='success'){
    this.Test=values;
    console.log(this.Test);
    this.loading = 'hide';}});
  this._problemservice.getAll().subscribe(values=>{this.Test=values});
    
}
getList(){
  this.loading = 'show';
  const id=this._problemservice.getIdentity()['id'];
  
  this._problemservice.getList(id).subscribe(values=>{
    console.log(values[0].stat);
    if(values[0].stat=='success'){
    this.Test=values;
    console.log(this.Test);
    this.loading = 'hide';}});
  
}
deleteProb(id){
  console.log(id)
  if(confirm("Are you sure to delete ")){
    
  this._problemservice.deleteprob(id).subscribe(
    response => {
      if(response['status'] == 'success'){
        window.location.reload();
      }else if(response['status'] == 'error'){
        alert('prob was not deleted');
      }
    },
    error =>{
      console.log(<any>error);
    }
  );
  }
}

}



