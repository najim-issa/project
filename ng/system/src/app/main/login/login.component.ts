import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        if (response.status) {
          console.log('my data');
          // Save the token or any other data you need
          localStorage.setItem('token', response.token);
          this.router.navigate(['admin']);  // Navigate to the dashboard or other protected route
        } else {
          this.errorMessage = 'Login failed';
        }
      },
      error => {
        this.errorMessage = 'Login failed: ' + error.error.message;
      }
    );
  }
}
