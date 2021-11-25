import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProblemService } from './services/problem.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEnd';
  public identity=null;
  public admin;
  public employe;
  public user;
 
  constructor(
  	private _userService:ProblemService
  ){
  	this.identity = this._userService.getIdentity();
    
  }
  ngOnInit(){
    if(this.identity != null){
    if(this._userService.getIdentity()['role']=='admin')
  this.admin= true
  else if(this._userService.getIdentity()['role']=='employe')
  this.employe= true
  else if(this._userService.getIdentity()['role']=='user')
  this.user= true
  }}
  
  logout(){
    
    localStorage.removeItem('identity');
    this.identity = null;
    window.location.href ="home";
    
  }
 
}
