import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProblemService } from '../services/problem.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialigComponent } from '../dialig/dialig.component';


@Component({
  selector: 'app-problem',
  templateUrl: '../views/problem.component.html',
  styleUrls: ['../css/problem.component.css'],
})
export class ProblemComponent implements OnInit {
  
  Test;
  public identity;
  public loading;
  result: String;

  constructor(private _problemservice: ProblemService,private router: Router,public dialog: MatDialog) {
    this.identity = this._problemservice.getIdentity();
    this.result='false';
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
  if(this.result=='true'){
    
  this._problemservice.deleteprob(id).subscribe(
    response => {
      if(response['stat'] == 'success'){
        window.location.reload();
      }else if(response['stat'] == '404'){
        alert('prob was not deleted');
      }
    },
    error =>{
      console.log(<any>error);
    }
  );
  }
}
openDialog(id): void {
  const dialogRef = this.dialog.open(DialigComponent, {
    width: '350px',
    data: {result: this.result}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.result = result;
    this.deleteProb(id);
    console.log(this.result)
  });
  
}

}



