import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataUser } from '../../app.entity';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpRequestService } from '../../../service/http-service/http-request.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './detail-user.component.html',
  styleUrl: './detail-user.component.scss'
})
export class DetailUserComponent implements OnInit{
  idUrl: string | null = null;
  methodUrl: string | null = null;
  dataUser!: DataUser[];
  addUserForm!: FormGroup;
  isLoading: boolean = false;

  @Output() userDataDelete = new EventEmitter<DataUser>();
  @Output() userStatus = new EventEmitter<DataUser>();

constructor(
  private router: Router,
  private httpRequestService: HttpRequestService,
  private activatedRoute: ActivatedRoute
) {
  this.addUserForm = new FormGroup({
    usernameForm: new FormControl('', Validators.required),
    nameForm: new FormControl('', [Validators.required, Validators.minLength(3)]),
    // ageForm: new FormControl(0, Validators.required),
    emailForm: new FormControl('', [Validators.required, Validators.email]),
    cityForm: new FormControl('', Validators.required),
    provinceForm: new FormControl ('', Validators.required),
    zipCodeForm: new FormControl ('', Validators.required),
    basicSalaryForm: new FormControl ('', Validators.required),
    paymentDeadlineForm: new FormControl(new Date(), [Validators.required]),
    isCheckedForm: new FormControl(false, [Validators.required])
  });
  this.idUrl = this.activatedRoute.snapshot.paramMap.get('id')!
  this.methodUrl = this.activatedRoute.snapshot.paramMap.get('method')
}

ngOnInit(): void {
  if(this.methodUrl == 'put'){
    this.fetchDataUserPut();
  } else {
    this.fetchDataUserNormal();
  }
}

get usernameForm() {
  return this.addUserForm.get('usernameForm')
}
get nameForm() {
  return this.addUserForm.get('nameForm')
}
// get ageForm() {
//   return this.addUserForm.get('ageForm')
// }
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
fetchDataUserNormal() {
  this.isLoading = true;
  this.httpRequestService.getData().subscribe((res: any) => {
    this.isLoading = false;
    this.dataUser = res;
    console.log(res)
  },(err) => {
    this.isLoading = false;
    console.log(err)
  })
}

fetchDataUserPut(){
  this.isLoading =  true;
  this.httpRequestService.getDataById(this.idUrl).subscribe((res:any) => {
    this.isLoading = false;
    console.log(res);

    const paymentDeadline = new Date(res.paymentDeadline).toISOString().split('T')[0];
    this.paymentDeadlineForm?.setValue(paymentDeadline);
    this.nameForm?.setValue(res.name)
    this.emailForm?.setValue(res.email)
    this.cityForm?.setValue(res.city)
    this.provinceForm?.setValue(res.paymentDeadline)
    this.zipCodeForm?.setValue(res.zipcode)
    // this.ageForm?.setValue(res.age)
    this.basicSalaryForm?.setValue(res.basicSalary)
    this.usernameForm?.setValue(res.username)
  }, (err) => {
    this.isLoading = false;
    console.log(err)}
  );
}

createUser(userData: DataUser) {
  const payload = userData;
  console.log(payload);
  this.httpRequestService.createUser(payload).subscribe((res: any) => {
    this.fetchDataUserNormal()
    console.log("success create user",res)
  })
}


onSubmit() {
  if (this.addUserForm.valid) {
    const idTmp: any = this.idUrl;
    const formData: DataUser =
    {
      id: idTmp,
      username: this.addUserForm.get('usernameForm')?.value,
      name: this.addUserForm?.get('nameForm')?.value,
      // age: this.addUserForm?.get('ageForm')?.value,
      email: this.addUserForm?.get('emailForm')?.value,
      zipcode: this.addUserForm?.get('zipCodeForm')?.value,
      city: this.addUserForm?.get('cityForm')?.value,
      province: this.addUserForm?.get('provinceForm')?.value,
      basicSalary: this.addUserForm?.get('basicSalaryForm')?.value,
      paymentDeadline: this.addUserForm?.get('paymentDeadlineForm')?.value,
      isChecked: false,
    }
    if(this.methodUrl == 'add'){
      this.createUser(formData);
      this.addUserForm.reset();
    } else if (this.methodUrl == 'put') {
      this.httpRequestService.editData(this.idUrl, formData).subscribe((res: any) => {
      console.log("Data berhasil di edit!", formData)
    }, (err) => {
      this.isLoading = false;
      console.log(err);      
    })
    } else {
    console.error('Form is invalid');
  }
}
this.goToLanding();
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

goToLanding() {
  console.log('Navigating to landing page...');
  this.fetchDataUserNormal()
  console.log(this.dataUser);
  this.router.navigate(['']).then(() => {
    console.log('Navigation complete, fetching data...');
  });
}

}