import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { DataUser } from '../app.entity';


@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() buttonLabel: string = '';
  @Input() dataForChild!: DataUser;
  @Output() submitButton = new EventEmitter<string>();


  onClick() {
    this.submitButton.emit('labelButton')
  }
}
