import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import {AuthService} from "../../services/auth.service";

interface User {
  email: String
  password: String
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  user: User = {
    email: '',
    password: ''
  }

  constructor(
    private modalService: NgbModal,
    private auth: AuthService
    ) {}

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

   this.auth.signUp(data)
   .subscribe(response => {
    console.log("Ответ от сервера: " + response);
   })
  }

  // Авторизация
  onSubmitAuthorisation(form: NgForm) {
    const data = {
      email: form.control.get('email')?.value,
      password: form.control.get('password')?.value
    }
    this.auth.signIn(data)
  }
}
