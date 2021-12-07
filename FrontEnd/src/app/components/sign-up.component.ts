import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { User } from '../models/user';
import { SignupService } from '../services/signup.service';
import { LoginComponent } from './login.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: '../views/sign-up.component.html',
  styleUrls: ['../css/sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public Us:User;
  private basePath = '/images';
  private p='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV0zscYTnOxutaPDaZ9Un0Ak-y0yR8jw40qA&usqp=CAU'
  file: File;
  url = '';
  public ready;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  check=false;
  used= false;


  constructor(private afStorage: AngularFireStorage,private _SignupService:SignupService, public dialogRef: MatDialogRef<LoginComponent>) { }
  ngOnInit(): void {
    this.Us = new User('','',null,'',this.url);
  }

  handleFiles(event) {
    this.file = event.target.files[0];
  }

  
  async uploadFile() {
    if (this.file) {
      const filePath =`${this.basePath}/${this.file.name}`; 
      const snap = await this.afStorage.upload(filePath, this.file);    
      await this.getUrl(snap);
    }else{
      this.Us.image = 'https://icon-library.com/images/unknown-person-icon/unknown-person-icon-10.jpg'; 
   this._SignupService.create(this.Us).subscribe(data=>{
        console.log(data['stat']);
        if(data['stat']=='402'){
          this.used=true;
     this.check=false;
      }else{
        this.dialogRef.close();
      }
    
    }
      );
    }
  }

  //method to retrieve download url
  private async getUrl(snap: firebase.storage.UploadTaskSnapshot) {
    const url = await snap.ref.getDownloadURL();
    this.url = url; 
    this.ready="true";
    this.Us.image=this.url;
    await this._SignupService.create(this.Us).subscribe(data=>{
      console.log(data['stat']);
      if(data['stat']=='402'){
        this.used=true;
   this.check=false;
    }else{
      this.dialogRef.close();
    }
  
  }
    );
  }
  async onSubmit(){
    this.check=true;
  await this.uploadFile();
    
  }

    onNoClick(): void {
      this.dialogRef.close();
    }
  
}
