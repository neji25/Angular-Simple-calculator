import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";

interface User {
  email: String
  password: String
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy{

  private streamSignUp$: Subscription | undefined
  private streamSignIn$: Subscription | undefined

  protected isAuthenticated: boolean = false

  constructor(
    private modalService: NgbModal,
    private auth: AuthService
    ) {}

  ngOnInit() {
    this.isAuthenticated = this.auth.isAuthenticated()
  }

  openVerticallyCentered(content: any) {
		this.modalService.open(content, { centered: true });
	}

  // Регистрация
  onSubmitRegistration(form: NgForm) {
   const data = {
    email: form.control.get('email')?.value,
    password: form.control.get('password')?.value
   }

   if(data.password !== form.control.get("rep_password")?.value) {
      return console.log('Пароли не совпадают')
   }

   this.streamSignUp$ = this.auth.signUp(data)
   .subscribe(response => {
      console.log("Ответ от сервера: " + response);
      this.modalService.dismissAll()
   })

  }

  // Авторизация
  onSubmitAuthorisation(form: NgForm) {
    const user: User = {
      email: form.control.get('email')?.value,
      password: form.control.get('password')?.value
    }
    this.streamSignIn$ = this.auth.signIn(user).subscribe(token => {
      this.auth.setToken(token.toString())
      this.isAuthenticated = this.auth.isAuthenticated()
      this.modalService.dismissAll()
    })
  }
  onLogout() {
    this.isAuthenticated = this.auth.logout()
  }

  ngOnDestroy() {
    this.streamSignUp$?.unsubscribe()
    this.streamSignIn$?.unsubscribe()
  }
}
