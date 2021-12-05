import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProblemService } from '../services/problem.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SignUpComponent } from './sign-up.component';
@Component({
  selector: 'app-login',
  templateUrl: '../views/login.component.html',
  styleUrls: ['../css/login.component.css']
})
export class LoginComponent implements OnInit {
  public user;
  public identity: any;
  public ident;
  public nope=false;
  token: any;
  constructor(private _problemservice: ProblemService,private router: Router,public dialog: MatDialog) { 
      this.user = {
        "email" : "",
        "password" : "",
        "getHash" : "true"
    };
    }

  ngOnInit(): void {
  }
  onSubmit(){
    this._problemservice.login(this.user).subscribe(
      data=>{
        if(data['stat']=='404'){
        this.nope=true;
        }else{
        this.nope=false;
        this.identity = data;
        localStorage.setItem('identity', JSON.stringify(this.identity));
        console.log('identity'+ JSON.stringify(this.identity));
        this.user.getHash = null;
        this._problemservice.login(this.user).subscribe(
          response => {
            this.token = response;

            if(this.identity.lenght <= 1){
              console.log("Server error");
            }{
              if(!this.identity.status){
                localStorage.setItem('token', JSON.stringify(this.token))
                console.log("Token : "+JSON.stringify(this.token));										
              }
            }
          },
          error => {
            console.log(<any>error);
          }
        );

        }
      }
    );}
    onclick()
   {
  
    var x = (<HTMLInputElement>document.getElementById("floatingPassword"));
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
   }
   openDialog(): void {
    const dialogRef = this.dialog.open(SignUpComponent, {
      width: '350px',
      
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
    });
    
  }
}
