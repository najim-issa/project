import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-snackbar',
  template: `
    <div class="snackbar-container">
      <span class="snackbar-message">{{ data }}</span>
      <button mat-button class="snackbar-action" (click)="closeSnackbar()">OK</button>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .snackbar-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: white;
      color: black;
      padding: 16px;
      box-shadow: 2px 2px 20px #89CFF0;
      border-radius: 5px;
      max-width: 300px;
      min-width: 300px;
      height: 100px;
    }
    .snackbar-message {
      font-size: 14px;
    }
    .snackbar-action {
      font-weight: bold;
      color: #007bff;
    }
  `]
})
export class CustomSnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

  closeSnackbar() {
    // Logic to close the snackbar goes here
  }
}
