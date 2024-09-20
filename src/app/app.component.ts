import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
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
import { LandingComponent } from "./pages/landing/landing.component";
import { LogoutComponent } from "./logout/logout.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ButtonComponent, FormsModule, ReactiveFormsModule, FormComponent, ReversePipe, LandingComponent, LogoutComponent],
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
  idUrl: string | null = '';


  constructor(
    private randomIdService: GenerateRandomIdService,
    // private deleteDataService: DeletedataService,
    private statusPaymentService: StatuspaymentService,
    private httpRequestService: HttpRequestService,
    private router: Router
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
      this.fetchDataUser();
  }

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

    goToLanding() {
      this.router.navigate([''])
    }
}