import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { ProblemService } from '../services/problem.service';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  edit:boolean;
  identity: String;
  user:User;
  photo: any;

  constructor(private _problemservice: ProblemService,private _userservice: SignupService,private router: Router) {
    this.identity = _problemservice.getIdentity();
    this.edit=true;
   }

  ngOnInit(): void {
    this.user = new User(this.identity['name'],this.identity['email'],this.identity['phone'],'','');
    console.log(this.identity);
    console.log(this.user);
    this.photo=this.identity['image'];
  }
  

  Edit(){

    this.edit = !this.edit;
    console.log(this.edit);
  }

  update(){
this._userservice.update(this.user,this.identity['id']).subscribe(value=>{
      
  console.log(value);
  this.identity['email']=this.user.email;
  this.identity['phone']=this.user.phone_number;
  this.identity['name']=this.user.Full_name
  localStorage.setItem('identity', JSON.stringify(this.identity));
});
  }

}
