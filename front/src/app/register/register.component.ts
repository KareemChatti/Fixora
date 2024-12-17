// Updated register.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    standalone: false
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    if (this.password === this.confirmPassword) {
      this.authService.signUp(this.email, this.password).subscribe(
        () => {
          alert(`Registration Successful! \nUsername: ${this.email}`);
          this.router.navigate(['/login']);
        },
        (error) => {
          alert('Registration Failed. Please try again.');
          console.error('Signup Error:', error);
        }
      );
    } else {
      alert('Passwords do not match!');
    }
  }
}