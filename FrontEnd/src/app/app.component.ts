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
  public identity;
  
  constructor(
  	private _userService:ProblemService
  ){
  	this.identity = this._userService.getIdentity();
  }
  logout(){
    
    localStorage.removeItem('identity');
    this.identity = null;
    window.location.href ="home";
  }
 
}
