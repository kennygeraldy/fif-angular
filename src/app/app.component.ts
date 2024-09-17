import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataUser } from './app.entity';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../button/button.component";
import { GenerateRandomIdService } from '../generate-random-id.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent } from "../form/form.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ButtonComponent, FormsModule, ReactiveFormsModule, FormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title: string = 'fif-angular-mt';
  dataUser!: Array<DataUser>;
  randomId: string;
  labelButton1: string = 'Ini dari parent 1';
  labelButton2: string = 'Ini dari parent 2';
  backgroundColor: string = 'yellow';
  name: string ='';
  addUserForm!: FormGroup;


  constructor(
    private randomIdService: GenerateRandomIdService
  ) {
    this.randomId = this.randomIdService.generateId();
    this.addUserForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(13)])
    })
  }


  @HostListener('mouseenter') onMouseEnter() {
    this.backgroundColor = 'red';
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.backgroundColor = 'green';
  }


  ngOnInit(): void {
      this.dataUser = [{
        name: 'Kenny',
        email:  'Ken@gmail.com',
        phoneNumber: '081382913391',
        address:
          {
            zipcode: 14310,
            city: 'Tangerang',
            province: 'Cisauk'
          }
      },
      {
        name: 'James',
        email:  'James@gmail.com',
        phoneNumber: '081282913391',
        address:
          {
            zipcode: 1421,
            city: 'Bali',
            province: 'Denpasar'
          }
      }]
  }


  eventFromParent(event: string) {
    console.log(event);
    this.labelButton1 = event;
    this.labelButton2 = event;
  }


  updateName(event: string) {
    this.name = event;
  }




  addUser(event: any) {
    console.log("before", event)
    this.dataUser.push(event)
    console.log('after',this.dataUser)
  }
  // onSubmit() {
  //   console.log(this.addUserForm.value)
  // }
}