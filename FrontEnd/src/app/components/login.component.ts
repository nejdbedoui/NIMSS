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
        this.identity = data;
        if(this.identity.lenght <= 1){
                    console.log("Server error");
                }
        localStorage.setItem('identity', JSON.stringify(this.identity));
        console.log(this._problemservice.getIdentity())
        window.location.href ="home";
      }
    );}
    
   
}
