import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  user = new User();
  view: string = 'paiement';
  constructor() { }

  ngOnInit(): void {
    // this.getUser();
    this.user.email = "franck@gmail.com";
    this.user.firstName = "Franck";
    this.user.lastName = "Libam";
    this.user.phone = "+243 336 364 833";
  }

  getUser() {
    let value = sessionStorage.getItem('user');
    this.user = JSON.parse(value);
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
  }

  setView(el) {
    this.view = el;
  }
}
