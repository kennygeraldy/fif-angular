import { Component } from '@angular/core';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
