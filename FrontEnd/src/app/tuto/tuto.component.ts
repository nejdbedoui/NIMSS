import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Reclamation } from '../models/reclamation';
import { ProblemService } from '../services/problem.service';

@Component({
  selector: 'app-tuto',
  templateUrl: './tuto.component.html',
  styleUrls: ['./tuto.component.css']
})
export class TutoComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public Rec:Reclamation;
  public identity: any;
  constructor(private _formBuilder: FormBuilder,  public dialogRef: MatDialogRef<TutoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AppComponent,private _problemservice: ProblemService,private router: Router) {
      this.identity = this._problemservice.getIdentity();
     }

  ngOnInit() {
    if(this.identity == null){
			this.router.navigate(['/login']);
		}else{
    this.Rec = new Reclamation(this.identity['id'],'','','New',new Date(),null,null);
  
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
   console.log( this.data)
  }}
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(){
    if(this.identity == null){
			this.router.navigate(['/login']);
		}else{
    this._problemservice.create(this.Rec).subscribe(
      data=>{console.log(data);}
    );
    }
  }
}
