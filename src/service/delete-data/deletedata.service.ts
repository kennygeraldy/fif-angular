import { Injectable } from '@angular/core';
import { DataUser } from '../../app/app.entity';

@Injectable({
  providedIn: 'root'
})
export class DeletedataService {

  userData: DataUser[] = [];
 
  constructor() { }

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

  deleteUser(event: any) {
    console.log("before", event)
    this.userData.splice(event, 1)
    console.log('after',this.userData)
    this.showSnackbar('User deleted successfully!');
  }

}