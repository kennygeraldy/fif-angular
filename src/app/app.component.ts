import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataUser } from './app.entity';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "./button/button.component";
import { GenerateRandomIdService } from '../service/generate-random-id/generate-random-id.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent } from "./form/form.component";
import { ReversePipe } from '../pipe/reverse.pipe';
import { DeletedataService } from '../service/delete-data/deletedata.service';
import { StatuspaymentService } from '../service/status-payment/statuspayment.service';
import { HttpRequestService } from '../service/http-service/http-request.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ButtonComponent, FormsModule, ReactiveFormsModule, FormComponent, ReversePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title: string = 'fif-angular-mt';
  dataUser!: DataUser[];
  randomId: string;
  labelButton1: string = 'Ini dari parent 1';
  labelButton2: string = 'Ini dari parent 2';
  backgroundColor: string = 'yellow';
  name: string ='';
  addUserForm!: FormGroup;
  isShown: boolean = true;
  today = new Date;
  isLoading: boolean = false;


  constructor(
    private randomIdService: GenerateRandomIdService,
    private deleteDataService: DeletedataService,
    private statusPaymentService: StatuspaymentService,
    private httpRequestService: HttpRequestService
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
      // this.dataUser = [{
      //   name: 'Kenny',
      //   email:  'Ken@gmail.com',
      //   phoneNumber: '081382913391',
      //   address:
      //     {
      //       zipcode: 14310,
      //       city: 'Tangerang',
      //       province: 'Cisauk',
      //       zone: 1,
      //     }
      // },
      // {
      //   name: 'James',
      //   email:  'James@gmail.com',
      //   phoneNumber: '081282913391',
      //   address:
      //     {
      //       zipcode: 1421,
      //       city: 'Bali',
      //       province: 'Denpasar',
      //       zone: 2,
      //     }
      // }]
      this.fetchDataUser();
  }


  eventFromParent(event: string) {
    console.log(event);
    this.labelButton1 = event;
    this.labelButton2 = event;
  }


  updateName(event: string) {
    this.name = event;
  }


  // addUser(event: any) {
  //   this.userDataService.addUser(event)
  // }
  
  // deleteUser(event: any) {
  //   this.deleteDataService.deleteUser(event)
  // }

  isPaymentNearDeadline(event: Date): boolean {
    const deadlineDate = new Date(event);
    const differenceInTime = deadlineDate.getTime() - new Date().getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays < 3;
  }

   showSnackbar(message: any) {
    let snackbar = document.getElementById("snackbar");

    if (snackbar) {
      snackbar.textContent = message;
  
      snackbar.classList.add("show");
  
      setTimeout(function () {
        snackbar.classList.remove("show");
      }, 3000);
    }
  }
  
  setStatus(event: any) {
    this.statusPaymentService.setUserStatus(event)
  }

  fetchDataUser() {
    this.isLoading = true;
    this.httpRequestService.getData().subscribe((res: any) => {
      this.isLoading = false;
      this.dataUser = res;
    },(err) => {
      this.isLoading = false;
      console.log(err)
    })
  }


  createUser(userData: DataUser) {
    const payload = userData;
    console.log(payload);
    this.httpRequestService.createUser(payload).subscribe((res: any) => {
      this.fetchDataUser()
      console.log("success create user",res)
    })
  }

  deleteUser(userId: any) {
    this.httpRequestService.deleteUser(userId).subscribe(
      (response) => {
        console.log('User deleted successfully:', response);
        this.fetchDataUser()
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }
  
}