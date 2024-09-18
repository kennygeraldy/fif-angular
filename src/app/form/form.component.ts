import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataUser } from '../app.entity';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  dataUser!: Array<DataUser>;
addUserForm!: FormGroup;
@Output() userDataSubmit = new EventEmitter<DataUser>();
@Output() userDataDelete = new EventEmitter<DataUser>();
@Output() userStatus = new EventEmitter<DataUser>();


constructor(
) {
  this.addUserForm = new FormGroup({
    nameForm: new FormControl('', [Validators.required, Validators.minLength(3)]),
    emailForm: new FormControl('', [Validators.required, Validators.email]),
    cityForm: new FormControl('', Validators.required),
    provinceForm: new FormControl ('', Validators.required),
    zipCodeForm: new FormControl (0, Validators.required),
    phoneNumberForm: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(13)]),
    paymentDeadlineForm: new FormControl(new Date(), [Validators.required]),
    statusForm: new FormControl(false, [Validators.required])
  });
}


get nameForm() {
  return this.addUserForm.get('nameForm')
}
get emailForm() {
  return this.addUserForm.get('emailForm')
}
get cityForm() {
  return this.addUserForm.get('cityForm')
}
get provinceForm() {
  return this.addUserForm.get('provinceForm')
}
get zipCodeForm() {
  return this.addUserForm.get('zipCodeForm')
}

get paymentDeadlineForm() {
  return this.addUserForm.get('paymentDeadlineForm')
}

get phoneNumberForm() {
  return this.addUserForm.get('phoneNumberForm')

}
get statusForm() {
  return this.addUserForm.get('statusForm')
}


// Listener
onSubmit() {
  if (this.addUserForm.valid) {
    const formData: DataUser =
    {
      name: this.nameForm?.value,
      email: this.emailForm?.value,
      phoneNumber: this.phoneNumberForm?.value,
      address:{
        zipcode: this.zipCodeForm?.value,
        city: this.cityForm?.value,
        province: this.provinceForm?.value,
      },
      paymentDeadline: this.paymentDeadlineForm?.value,
      status: this.statusForm?.value,
    }
    this.userDataSubmit.emit(formData);
    this.addUserForm.reset();
    console.log(formData)
  } else {
    console.error('Form is invalid');
  }
}

onDelete() {
  if(this.addUserForm.valid) {
    const formData: DataUser = 
    {
      name: this.nameForm?.value,
      email: this.emailForm?.value,
      phoneNumber: this.phoneNumberForm?.value,
      address:{
        zipcode: this.zipCodeForm?.value,
        city: this.cityForm?.value,
        province: this.provinceForm?.value,
      },
      paymentDeadline: this.paymentDeadlineForm?.value,
      status: this.statusForm?.value,
    }
    this.userDataDelete.emit((formData));
    console.log(formData)
  } else {
    console.error('Data is invalid')
  }
}

strikethrough() {
  if(this.addUserForm.valid) {
    const formData: DataUser = 
    {
      name: this.nameForm?.value,
      email: this.emailForm?.value,
      phoneNumber: this.phoneNumberForm?.value,
      address:{
        zipcode: this.zipCodeForm?.value,
        city: this.cityForm?.value,
        province: this.provinceForm?.value,
      },
      paymentDeadline: this.paymentDeadlineForm?.value,
      status: this.statusForm?.value,
    }
    this.userStatus.emit((formData))
  } else {
    console.error('Data is invalid')
  }
}

}
