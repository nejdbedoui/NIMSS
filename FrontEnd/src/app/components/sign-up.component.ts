import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { User } from '../models/user';
import { SignupService } from '../services/signup.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: '../views/sign-up.component.html',
  styleUrls: ['../css/sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public Us:User;
  private basePath = '/images';
  file: File;
  url = '';
  public ready;



  constructor(private afStorage: AngularFireStorage,private _SignupService:SignupService) { }
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
      this.getUrl(snap);
    } else {alert('Please select an image'); }
  }

  //method to retrieve download url
  private async getUrl(snap: firebase.storage.UploadTaskSnapshot) {
    const url = await snap.ref.getDownloadURL();
    this.url = url; 
    this.ready="true";
    this.Us.image=this.url;
    console.log('us image',this.Us.image);
    this._SignupService.create(this.Us).subscribe(
    data=>{console.log(data);}
    );
  }
  onSubmit(){
    this.uploadFile();
    }
  
}
