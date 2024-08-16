import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { CustomSnackbarComponent } from '../custom-snackbar/custom-snackbar.component';

@Component({
  selector: 'app-collectors',
  templateUrl: './collectors.component.html',
  styleUrls: ['./collectors.component.css']
})
export class CollectorsComponent implements OnInit {
  empForm: FormGroup;
  loading = true;
  isLoading: boolean | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.empForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone_number: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onFormSubmit() {
    if (this.empForm.valid) {
      this.isLoading = true; // Show the spinner

      this.authService.signup(this.empForm.value).subscribe(
        response => {
          this.isLoading = false; // Hide the spinner
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: 'Registration successful!',
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });

          // this.registrationForm.reset(); // Optionally reset the form
        },
        error => {
          this.isLoading = false; // Hide the spinner
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: 'Registration failed. Please try again.',
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
          console.error('Registration error:', error);
        }
      );
    }
  }
}
