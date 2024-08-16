import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ContactusComponent } from '../contactus/contactus.component';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.css'
})
export class MainDashboardComponent {

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(ContactusComponent, {
      width: '600px', // Customize the width
      height: '500px', // Customize the height
    });
  }  

}
