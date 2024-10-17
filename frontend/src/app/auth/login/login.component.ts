import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ username: this.username, password: this.password }).then(
      (response) => {
        if (response.token) {
          this.router.navigate(['/']);
        } else {
          this.loginError = true;
        }
      }
    ).catch(
      (error) => {
        this.loginError = true;
        console.error('Login error:', error); // Debugging step
      }
    );
  }
}
