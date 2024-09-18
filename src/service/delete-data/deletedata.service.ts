import { Injectable } from '@angular/core';
import { userDataPublic } from '../../app/user.data';

@Injectable({
  providedIn: 'root'
})
export class DeletedataService {

  userData = userDataPublic;
 
  constructor() { }

  deleteUser(event: any) {
    console.log("before", event)
    this.userData.splice(event, 1)
    console.log('after',this.userData)
  }

}