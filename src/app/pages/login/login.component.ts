import { Component } from '@angular/core';
import { AuthenticationService } from '../../../service/authentication/authentication.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = 'emilys';
  password: string = 'emilyspass';
  error: string = '';


  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}


 
  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => this.error = 'Login failed. Please try again',
    });
  }
}
