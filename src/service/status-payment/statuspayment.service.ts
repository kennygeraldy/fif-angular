import { Injectable } from '@angular/core';
import { userDataPublic } from '../../app/user.data';

@Injectable({
  providedIn: 'root'
})
export class StatuspaymentService {
  
  userData = userDataPublic;
 
  constructor() { }

  setUserStatus(event: any) {
   event.checked = !event.checked
  }
}
