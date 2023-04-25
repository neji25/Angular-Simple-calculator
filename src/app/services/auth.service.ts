import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper: JwtHelperService = new JwtHelperService()

  private apiUrlSignUp = "http://localhost:3000/register"
  private apiUrlSignIn = "http://localhost:3000/login"

  constructor(private http: HttpClient) {
  }

  public getToken():string {
    const token = localStorage.getItem('token')
    return token ? token : ''
  }

  public setToken(token: string):void {
    localStorage.setItem('token', token)
  }

  public isAuthenticated():boolean {
    const token = this.getToken()
    return !this.jwtHelper.isTokenExpired(token)
  }

  public signUp(data: any) {
      return this.http.post(this.apiUrlSignUp, data)
  }

  public signIn(data:any) {
    return this.http.post(this.apiUrlSignIn, data)
  }

  public logout() {
    localStorage.removeItem("token")
    return this.isAuthenticated()
  }
}
