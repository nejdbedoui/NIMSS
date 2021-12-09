import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';
import { ProblemService } from './services/problem.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
]
})
export class AppComponent {
  title = 'FrontEnd';
  public identity=null;
  public admin;
  public employe;
  public user;
  public name;
  public photo;
 
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
  this.name=this._userService.getIdentity()['name'];
  this.photo=this._userService.getIdentity()['image'];
 
  }
  var navOffset = $("#nav-bar").offset().top;
  var navBar = $("#nav-bar");
  
  var $win = $(window).scroll(function () {
    if ($win.scrollTop() >navOffset) {
      navBar.addClass("nav-bar-top").removeClass("nav-bar-scrolled");
    } else if ($win.scrollTop() == 0) {
      navBar.addClass("nav-bar-scrolled").removeClass("nav-bar-top");
    }
  });
}
  
  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    this.identity = null;
    
    window.location.href ="home";
    
    
  }
 
}
