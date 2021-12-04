import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProblemService } from '../services/problem.service';

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
  constructor(private _problemservice: ProblemService,private router: Router) { 
      this.user = {
        "email" : "",
        "password" : ""
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
        console.log(this._problemservice.getIdentity())
        window.location.href ="home";
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
}
