import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../models/data';


@Component({
  selector: 'app-dialig',
  templateUrl: './dialig.component.html',
  styleUrls: ['./dialig.component.css']
})
export class DialigComponent {

  constructor(
    public dialogRef: MatDialogRef<DialigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
      data.result="true";
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}