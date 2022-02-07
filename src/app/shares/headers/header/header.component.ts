import { Component, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, map, Observable, OperatorFunction } from 'rxjs';
import { Products } from 'src/app/models/products';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  langue: string = '';
  product = new Products();
  products:Products[] = [];
  showModal: boolean = false;
  resultPhone = 0;
  resultPhoneCover = 0;
  resultProtectiveMembrane = 0;

  @Output() modalSearch = new EventEmitter<string>();
  produits: Observable<readonly Products[]>;

  search: OperatorFunction<string, readonly Products[]> = (text$: Observable<string>) => text$.pipe(
    debounceTime(2),
    distinctUntilChanged(),
    filter(term => term.length >= 1),
    map(term => this.products.filter(product => new RegExp(term, 'mi').test(product.nom + ' ' + product.marque + ' ' + product.description)).slice(0, 10))
  );

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.langue = 'fr';
    this.all();
  }

  searchProduct(term: string): void {
    this.modalSearch.emit(term);
    if(term.length > 0) {
      this.showModal = true;
    } else {
      this.showModal = false;
    }
  
    const value = new Observable<string>((observer) => {
      observer.next(term);
    });

    let result = this.search(value);
    this.produits = result; 
  } 
  
  userAccount(page) {
    if (page === 'home') {
      this.router.navigateByUrl('/user-account');
    } else {
      this.router.navigateByUrl('/user-account/' + page);
    }
  }

  chooseLanguage(langue: string) {
    this.langue = langue;
  }

  all() {
    this.productService.all().subscribe(
      (data) => {
        if (data != null && data.length > 0) {
          this.products = data;
        }
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  countSmart(): number {
  
    let result = this.produits.pipe(map(items => items.filter(item => item.type === 'telephone').length));
    console.log('value ',result);
    result.subscribe(event => {
      this.resultPhone = event; 
      console.log(event);
      return event
    });
    console.log(this.resultPhone )
    return this.resultPhone ;
  }

  countSmartCover(): number {
  
    let result = this.produits.pipe(map(items => items.filter(item => item.type === 'smart cover').length));
    console.log('value ',result);
    result.subscribe(event => {
      this.resultPhoneCover = event; 
      console.log(event);
      return event
    });
    console.log(this.resultPhoneCover )
    return this.resultPhoneCover ;
  }

  countProtective(): number {

    let result = this.produits.pipe(map(items => items.filter(item => item.type === 'protective menbrane').length));
    console.log('value ',result);
    result.subscribe(event => {
      this.resultProtectiveMembrane = event; 
      console.log(event);
      return event
    });
    console.log(this.resultProtectiveMembrane )
    return this.resultProtectiveMembrane ;
  }
}
