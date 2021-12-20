import { Component, OnInit } from '@angular/core';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-employee',
  templateUrl: '../views/employee.component.html',
  styleUrls: ['../css/employee.component.css']
})
export class EmployeeComponent implements OnInit {
  loading;
  empppp;
  constructor(private _SignupService:SignupService) { }

  ngOnInit(): void {
    
    this.getAll();
  }
  getAll(){
    this.loading = 'show';
    
  this._SignupService.employe().subscribe(data=>{
    const ELEMENT_DATA: [] =this.empppp;
   if(data[0]["stat"]=='success'){
    this.empppp=this.empppp= Object.values(data);
    console.log( this.empppp)
    this.loading = 'hide';}
    else if(data["stat"]["stat"]=='404'){
      this.loading='hide';
    }
  });
}
}
