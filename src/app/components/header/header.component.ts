import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { DataServiceService } from 'src/app/services/data-service.service';

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
    private dataService: DataServiceService
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
   
   this.dataService.postUser(data)
   .subscribe(response => {
    console.log("Ответ от сервера: " + response);
   })
  }

  // Авторизация
  onSubmitAuthorisation(form: NgForm) {

  }

}
