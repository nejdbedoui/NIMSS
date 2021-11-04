import { Component, OnInit } from '@angular/core';
import { Reclamation } from '../models/reclamation';
import { CreateproblemService } from '../services/createproblem.service';

@Component({
  selector: 'app-createproblem',
  templateUrl: '../views/createproblem.component.html',
  styleUrls: ['../css/createproblem.component.css']
})
export class CreateproblemComponent implements OnInit {
  public Rec:Reclamation;
  rectest:Reclamation;
  constructor(private _problemservice: CreateproblemService) { }

  ngOnInit(): void {
    this.Rec = new Reclamation(1,'','','New',new Date());
  }
  onSubmit(){
    this._problemservice.create(this.Rec).subscribe(
      data=>{console.log(data);}
    );}
    
}
