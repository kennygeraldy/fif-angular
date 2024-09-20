import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../../../service/http-service/http-request.service';
import { DataUser } from '../../app.entity';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatuspaymentService } from '../../../service/status-payment/statuspayment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {
  dataUser!: DataUser[]
  isLoading: boolean = false
  url: string | null = null;

  constructor(
    private httpRequestService: HttpRequestService,
    private statusPaymentService: StatuspaymentService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
      this.fetchDataUser();
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
  
  isPaymentNearDeadline(event: Date): boolean {
    const deadlineDate = new Date(event);
    const differenceInTime = deadlineDate.getTime() - new Date().getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays < 3;
  }

  setStatus(event: any) {
    this.statusPaymentService.setUserStatus(event)
  }

  deleteUser(userId: any) {
    this.httpRequestService.deleteUser(userId).subscribe(
      (response) => {
        console.log('User deleted successfully:', response);
        this.showSnackbar('User deleted successfully!');
        this.fetchDataUser()
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  goToLanding() {
    this.router.navigate(['']);
  }

  goToDetail(event: any) {
    this.url = `/detail/${event}/put`
    this.router.navigate([this.url]);
  }

  goToForm() {
    this.router.navigate(['/detail/0/add']);
  }
}
