import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DashbordComponent } from '../components/dashbord.component';
import { MyErrorStateMatcher, SignUpComponent } from '../components/sign-up.component';
import { User } from '../models/user';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  public Us:User;
  private basePath = '/images';
  private p='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV0zscYTnOxutaPDaZ9Un0Ak-y0yR8jw40qA&usqp=CAU'
  file: File;
  url = '';
  emp;
  loading;
  public ready;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  check=false;
  used= false;


  constructor(public dialog: MatDialog,private _formBuilder: FormBuilder,private afStorage: AngularFireStorage,private _SignupService:SignupService, public dialogRef: MatDialogRef<DashbordComponent>) { }
  ngOnInit(): void {
    this.Us = new User('','',null,'',this.url);
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  
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
   this._SignupService.create1(this.Us).subscribe(data=>{
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
    await this._SignupService.create1(this.Us).subscribe(data=>{
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
