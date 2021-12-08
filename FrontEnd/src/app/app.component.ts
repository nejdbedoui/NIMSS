import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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
  isHome: boolean = false;
  constructor(
  	private _userService:ProblemService,
    private router: Router
  ){
  	this.identity = this._userService.getIdentity();
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        // event is an instance of NavigationEnd, get url!  
        const url = event.urlAfterRedirects;
        this.isHome = (url === '/' || url === '/home' || url === '/login') ? true : false
      }
    })

  }
  
  scrolled: boolean = false;
  
  @HostListener("window:scroll", [])
  onWindowScroll() {
      this.scrolled = window.scrollY > 0;
  }

  ngOnInit(){
    if(this.identity != null){
      if(this._userService.getIdentity()['role']=='admin')
        this.admin= true
      else if(this._userService.getIdentity()['role']=='employe')
        this.employe= true
      else if(this._userService.getIdentity()['role']=='user')
        this.user= true
    }
    

  }
  
  logout(){
    
    localStorage.removeItem('identity');
    this.identity = null;
    window.location.href ="home";
    
  }
 
}
