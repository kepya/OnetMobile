import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  showCart: boolean = false;

  constructor(private likeService: LikeService, private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.route.snapshot.params['page']) {
      this.view = this.route.snapshot.params['page'];
    }
    
    let userId = sessionStorage.getItem('idUser');
    this.getUser(userId);
    this.getLike(userId);
  }

  close() {
    this.showCart = false;
  }

  getEvent(event) {
    if (event != null && event != '') {
      this.showCart = true;
    } else {
      this.showCart = false;
    }

    console.log('Event: ' + event);
  }

  getUser(userId) {
    this.user.firstName ='';
    this.user.lastName = '';
    if (userId) {
      this.findUser(userId);
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  setView(el) {
    this.view = el;
  }

  findUser(id) {
    this.userService.find(id).subscribe(
      (data) => {
        this.user = data;
      }, (error) => {
        console.log('Erreur', error);
      }
    )
  }

  getLike(id) {
    let userId = this.user._id ? this.user._id : id;
    this.likeService.allByUser(userId).subscribe(
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
