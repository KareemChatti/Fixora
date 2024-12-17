import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: false
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        const token = response.access_token; 
        localStorage.setItem('access_token', token); 
        alert(`Login Successful! \nUsername: ${this.email}`);
        console.log('Login Response:', response);
        this.router.navigate(['/form']);
      },
      (error) => {
        alert('Login Failed. Please check your credentials.');
        console.error('Login Error:', error);
      }
    );
  }
}