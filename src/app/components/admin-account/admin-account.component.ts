import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Favoris } from 'src/app/models/favoris';
import { Products } from 'src/app/models/products';
import { User } from 'src/app/models/user';
import { LikeService } from 'src/app/shares/services/like.service';
import { UserService } from 'src/app/shares/services/user.service';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.scss']
})
export class AdminAccountComponent implements OnInit {

  user = new User();
  view: string = 'paiement';
  products: Products[] = [];
  users: User[] = [];

  constructor(private likeService: LikeService, private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.route.snapshot.params['page']) {
      this.view = this.route.snapshot.params['page'];
    }
    
    let userId = sessionStorage.getItem('idUser');
    this.getUser(userId);
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

  allUser() {
    this.userService.allSimpleUser().subscribe(
      (data) => {
        this.users = data;
        console.log("data", data);
      }, (error) => {
        console.log('Erreur', error);
      }
    )
  }

}
