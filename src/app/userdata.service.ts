import { Injectable } from '@angular/core';
import { userDataPublic } from './user.data';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  userData = userDataPublic;
  
  constructor() { }

  getUsers() {
    return this.userData
  }
}
