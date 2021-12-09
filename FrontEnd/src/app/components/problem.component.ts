import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ProblemService } from '../services/problem.service';

import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { TutoComponent } from '../tuto/tuto.component';


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
  token: any;
  create: string;
  public admin=false;
  public employe=false;
  public user=false;

  constructor(private _problemservice: ProblemService,private _userService:ProblemService,private router: Router,public dialog: MatDialog) {
    this.identity = this._problemservice.getIdentity();
    this.token = this._problemservice.getToken();
    this.result='false';
    if(this._userService.getIdentity()['role']=='admin')
    this.admin= true
    else if(this._userService.getIdentity()['role']=='employe')
    this.employe= true
    else if(this._userService.getIdentity()['role']=='user')
    this.user= true
   }

  ngOnInit(): void {
    if(this.identity == null){
			this.router.navigate(['/login']);
		}else{
      this.create='';
      const ELEMENT_DATA: [] =this.Test;
      
     if(this._problemservice.getIdentity()['role']=='user')
    this.getList();
    else
    this.getAll();
    }
  }
  getAll(){
    this.loading = 'show';
    
  this._problemservice.getAll(this.token).subscribe(values=>{

    if(values[0].stat=='success'){
    this.Test=values;
    
    this.loading = 'hide';}
    else if(values[0].stat=='404'){
      this.create='showa';
    }
  });
  
    
}
getList(){
  this.loading = 'show';
  const id=this._problemservice.getIdentity()['id'];
  
  this._problemservice.getList(id).subscribe(values=>{
   
    if(values[0].stat=='success'){
    this.Test=values;

    this.loading = 'hide';
  }else if(values[0].stat=='404'){
    this.create='showu';
    this.loading = 'hide';
    this.openDialog2();
  }
  
  });
  
}
deleteProb(id){
  
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
  const dialogRef = this.dialog.open(DialogComponent, {
    width: '350px',
    data: {result: this.result}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.result = result;
    this.deleteProb(id);
  
  });
  
}
openDialog2(): void {
  const dialogRef = this.dialog.open(TutoComponent, {
    width: '800px',
  
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    
  });
}

}



