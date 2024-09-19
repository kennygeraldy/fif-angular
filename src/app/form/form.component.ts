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
    usernameForm: new FormControl('', Validators.required),
    nameForm: new FormControl('', [Validators.required, Validators.minLength(3)]),
    ageForm: new FormControl(0, Validators.required),
    emailForm: new FormControl('', [Validators.required, Validators.email]),
    cityForm: new FormControl('', Validators.required),
    provinceForm: new FormControl ('', Validators.required),
    zipCodeForm: new FormControl ('', Validators.required),
    basicSalaryForm: new FormControl ('', Validators.required),
    paymentDeadlineForm: new FormControl(new Date(), [Validators.required]),
    isCheckedForm: new FormControl(false, [Validators.required])
  });
}

get usernameForm() {
  return this.addUserForm.get('usernameForm')
}
get nameForm() {
  return this.addUserForm.get('nameForm')
}
get ageForm() {
  return this.addUserForm.get('ageForm')
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
get basicSalaryForm() {
  return this.addUserForm.get('basicSalaryForm')
}
get paymentDeadlineForm() {
  return this.addUserForm.get('paymentDeadlineForm')
}
get isCheckedForm() {
  return this.addUserForm.get('isCheckedForm')
}


// Listener
onSubmit() {
  if (this.addUserForm.valid) {
    const formData: DataUser =
    {
      username: this.usernameForm?.value,
      name: this.nameForm?.value,
      // age: this.ageForm?.value,
      email: this.emailForm?.value,
      zipcode: this.zipCodeForm?.value,
      city: this.cityForm?.value,
      province: this.provinceForm?.value,
      basicSalary: this.basicSalaryForm?.value,
      paymentDeadline: this.paymentDeadlineForm?.value,
      isChecked: this.isCheckedForm?.value,
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
      username: this.usernameForm?.value,
      name: this.nameForm?.value,
      // age: this.ageForm?.value,
      email: this.emailForm?.value,
      zipcode: this.zipCodeForm?.value,
      city: this.cityForm?.value,
      province: this.provinceForm?.value,
      basicSalary: this.basicSalaryForm?.value,
      paymentDeadline: this.paymentDeadlineForm?.value,
      isChecked: this.isCheckedForm?.value,
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
      username: this.usernameForm?.value,
      name: this.nameForm?.value,
      // age: this.ageForm?.value,
      email: this.emailForm?.value,
      zipcode: this.zipCodeForm?.value,
      city: this.cityForm?.value,
      province: this.provinceForm?.value,
      basicSalary: this.basicSalaryForm?.value,
      paymentDeadline: this.paymentDeadlineForm?.value,
      isChecked: this.isCheckedForm?.value,
    }
    this.userStatus.emit((formData))
  } else {
    console.error('Data is invalid')
  }
}

}
