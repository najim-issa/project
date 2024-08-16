import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-collector',
  templateUrl: './edit-collector.component.html',
  styleUrl: './edit-collector.component.css'
})
export class EditCollectorComponent {

  userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditCollectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      id: [data.user?.id || '', Validators.required], // Include ID in the form
      name: [data.user?.name || '', Validators.required],
      email: [data.user?.email || '', [Validators.required, Validators.email]],
      phone_number: [data.user?.phone_number || '', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value); // Send form data back with ID
    }
  }
}
