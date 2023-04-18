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

  onSubmit(form: NgForm) {
   form = form.control.value
   console.log(form);
   this.dataService.postUser(form)
   .subscribe(response => {
    console.log("Ответ от сервера: " + response);
   })
  }

}
