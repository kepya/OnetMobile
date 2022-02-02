import { Component, OnInit } from '@angular/core';
import { Like } from 'src/app/models/like';
import { Products } from 'src/app/models/products';
import { User } from 'src/app/models/user';
import { LikeService } from 'src/app/shares/services/like.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  user = new User();
  view: string = 'paiement';
  likes: Like[] = [];
  products: Products[] = [];

  constructor(private likeService: LikeService) { }

  ngOnInit(): void {
    // this.getUser();
    this.user.email = "franck@gmail.com";
    this.user.firstName = "Franck";
    this.user.lastName = "Libam";
    this.user.phone = "+243 336 364 833";
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

  getLike() {
    this.likeService.allByUser(this.user._id).subscribe(
      (data) => {
        this.likes = data;
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
