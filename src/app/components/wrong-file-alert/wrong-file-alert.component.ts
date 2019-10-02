import {Component, OnInit,} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {HomeComponent} from '../home/home.component';

@Component({
  selector: 'app-wrong-file-alert',
  templateUrl: './wrong-file-alert.component.html',
  styleUrls: ['./wrong-file-alert.component.css']
})
export class WrongFileAlertComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<HomeComponent>) {
  }

  ngOnInit() {
  }

  onClick() {
    this.dialogRef.close();
  }

}
