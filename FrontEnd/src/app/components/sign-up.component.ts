import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-sign-up',
  templateUrl: '../views/sign-up.component.html',
  styleUrls: ['../css/sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  private basePath = '/images';
  file: File;
  url = '';

  constructor(private afStorage: AngularFireStorage) { }
  ngOnInit(): void {
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
    this.url = url;  //store the URL
    console.log(this.url);
  }
}
