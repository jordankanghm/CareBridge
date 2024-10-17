import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  role: string = '';
  registerError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register({ username: this.username, password: this.password, role: this.role }).then(
      (response) => {
        if (response && response.message === 'User registered') {
          this.router.navigate(['/login']);
        } else {
          this.registerError = true;
        }
      }
    ).catch(
      (err) => {
        this.registerError = true;
        console.error('Registration error:', err);
      }
    );
  }
}
