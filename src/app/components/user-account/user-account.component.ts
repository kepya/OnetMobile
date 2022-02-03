import { Component, OnInit } from '@angular/core';
import { Favoris } from 'src/app/models/favoris';
import { Like } from 'src/app/models/like';
import { Products } from 'src/app/models/products';
import { User } from 'src/app/models/user';
import { LikeService } from 'src/app/shares/services/like.service';
import { UserService } from 'src/app/shares/services/user.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  user = new User();
  view: string = 'paiement';
  like = new Favoris();
  products: Products[] = [];

  constructor(private likeService: LikeService, private userService: UserService) { }

  ngOnInit(): void {
    // this.getUser();
    this.user.email = "franck@gmail.com";
    this.user.firstName = "Franck";
    this.user.lastName = "Libam";
    this.user.phone = "+243 336 364 833";
    this.user._id = "61f762c791358cbd89c09d66"
    this.getLike();
  }

  getUser() {
    let value = sessionStorage.getItem('user');
    if (value) {
      this.user = JSON.parse(value); 
    }
  }
  logout() {
    sessionStorage.clear();
    localStorage.clear();
  }

  setView(el) {
    this.view = el;
  }

  findUser() {
    this.userService.find(this.user._id).subscribe(
      (data) => {
        this.user = data;
      }, (error) => {
        console.log('Erreur', error);
      }
    )
  }

  getLike() {
    this.likeService.allByUser(this.user._id).subscribe(
      (data) => {
        this.like = data;
        console.log("data", data);
      }, (error) => {
        console.log('Erreur', error);
      }
    )
  }

  getProductByLike() {
    this.likeService.allProductByUser(this.user._id).subscribe(
      (data) => {
        this.products = data;
      }, (error) => {
        console.log('Erreur', error);
      }
    )
  }
}
