import { Injectable } from '@angular/core';
import { userDataPublic } from '../../app/user.data';


@Injectable({
  providedIn: 'root'
})
export class UserdataService {


  userData = userDataPublic;
 
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

  getUsers() {
    return this.userData
  }

  addUser(event: any) {
    console.log("before", event)
    this.userData.push(event)
    this.showSnackbar('User added successfully!');
    console.log('after',this.userData)
  }

}
