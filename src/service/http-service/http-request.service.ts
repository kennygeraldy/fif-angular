import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataUser } from '../../app/app.entity';


@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {


  apiUrl: string = 'https://6580f9853dfdd1b11c424344.mockapi.io/rakamin/account-balance'


  constructor(
    private httpClient: HttpClient
  ) { }

  getData() {
    return this.httpClient.get(this.apiUrl);
  }

  createUser(payload: DataUser) {
    return this.httpClient.post(this.apiUrl,payload)
  }

  deleteUser(userId: string) {
    const deleteUrl = `${this.apiUrl}/${userId}`; 
    return this.httpClient.delete(deleteUrl); 
  } 
}