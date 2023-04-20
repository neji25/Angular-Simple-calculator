import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthToken } from "../auth-token";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper: JwtHelperService = new JwtHelperService()

  private apiUrl = "http://localhost:3000/register"

  constructor(private http: HttpClient) {
  }

  public getToken():string {
    const token = localStorage.getItem('token')
    return token ? token : ''
  }

  public setToken(token: AuthToken):void {
    localStorage.setItem('token', token.access_token)
  }

  public isAuthenticated():boolean {
    const token = this.getToken()
    return !this.jwtHelper.isTokenExpired(token)
  }

  public signIn(data: any) {
    return this.http.post(this.apiUrl, data)
  }
}
