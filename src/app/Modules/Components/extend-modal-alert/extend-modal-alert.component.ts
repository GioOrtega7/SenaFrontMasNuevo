import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-extend-modal-alert',
  templateUrl: './extend-modal-alert.component.html',
  styleUrls: ['./extend-modal-alert.component.css']
})
export class ExtendModalAlertComponent {

  constructor(
    private dialogRef: MatDialogRef<ExtendModalAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public extendModalAlertTitle: string
  ){}

  accept(){    
    this.dialogRef.close(true);
  }

  cancel(){
    this.dialogRef.close(false);
  }
}
