import { Injectable } from '@angular/core';
import { userDataPublic } from '../../app/user.data';


@Injectable({
  providedIn: 'root'
})
export class UserdataService {


  userData = userDataPublic;
 
  constructor() { }


  getUsers() {
    return this.userData
  }

  addUser(event: any) {
    console.log("before", event)
    this.userData.push(event)
    console.log('after',this.userData)
  }

}
