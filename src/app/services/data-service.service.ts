import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})

export class DataServiceService {

  private apiUrl = "http://localhost:3000/register"
  private isAuthenticated = false

  constructor(private http: HttpClient) { }

  login() {
    this.isAuthenticated = true
  }

  logout() {
    this.isAuthenticated = false
  }

  isLoggedIn():boolean {
    return this.isAuthenticated
  }

  postUser(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data)
  }
}
