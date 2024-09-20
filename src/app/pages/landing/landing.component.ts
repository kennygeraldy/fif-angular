import { Component } from '@angular/core';
import { LogoutComponent } from "../../logout/logout.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [LogoutComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
