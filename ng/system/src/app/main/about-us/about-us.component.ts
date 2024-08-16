import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {

  showMoreInfo: boolean = false;

  toggleMoreInfo(): void {
    this.showMoreInfo = !this.showMoreInfo;
  }
  
}
