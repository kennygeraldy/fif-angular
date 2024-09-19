import { Injectable } from '@angular/core';
import { DataUser } from '../../app/app.entity';

@Injectable({
  providedIn: 'root'
})
export class StatuspaymentService {
  
  userData: DataUser[] = [];
 
  constructor() { }

  setUserStatus(event: any) {
   event.checked = !event.checked
  }
}
