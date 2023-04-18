import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})

export class DataServiceService {

  private apiUrl = "http://localhost:3000/register"

  constructor(private http: HttpClient) { }

  postUser(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data)
  }
}
