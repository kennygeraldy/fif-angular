import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  apiUrl: string = 'https://6580f9853dfdd1b11c424344.mockapi.io/rakamin/employee'

  constructor(
    private httpClient: HttpClient
  ) { }

  getData() {
    return this.httpClient.get(this.apiUrl);
  }
}
