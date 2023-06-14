import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { FormControl,FormsModule } from '@angular/forms';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-extend-modal',
  templateUrl: './extend-modal.component.html',
  styleUrls: ['./extend-modal.component.css']
})
export class ExtendModalComponent {
  formProyecto!: UntypedFormGroup;



}
