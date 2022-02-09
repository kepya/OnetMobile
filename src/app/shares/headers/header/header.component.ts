
import { debounceTime, distinctUntilChanged, Observable, of, OperatorFunction } from 'rxjs';
import { Products } from 'src/app/models/products';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  username: string = '';

  @Output() modalSearch = new EventEmitter<string>();
  produits: Observable<readonly Products[]>;
  articles: Products[] = [];
  countSmart: number = 0;
  countSmartCover: number = 0;
  countProtective: number = 0;

  // search: OperatorFunction<string, readonly Products[]> = (text$: Observable<string>) => text$.pipe(
  //   debounceTime(2),
  //   distinctUntilChanged(),
  //   filter(term => term.length >= 1),
  //   map(term => this.products.filter(product => new RegExp(term, 'mi').test(product.nom + ' ' + product.marque + ' ' + product.description)).slice(0, 10))
  // );

  constructor(private productService: ProductService, private router: Router, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {

    let langue = localStorage.getItem('langue');
    if (langue != null && langue != undefined) {
      this.langue = langue;
    } else {
      this.langue = 'fr';
      localStorage.setItem('langue', 'fr');
    }

    let id = sessionStorage.getItem('idUser');
    if (id) {
      this.username = sessionStorage.getItem('username');
    }
    this.all();
  }

  private filterProduct(product: Products, filterValue: string) {
    // let val = product.nom.search('/' + filterValue +'/i') || product.marque.search('/' + filterValue +'/i');
    let index = product.nom.toLowerCase().indexOf(filterValue);

    if (index > -1) {
      return true;
    } else {
      return false;
    }
  }

  private filter(value: string): Products[] {
    const filterValue = value.toLowerCase();
    let result = this.products
    .filter(product => this.filterProduct(product, filterValue));
    
    return result;
  }

  getFilteredOptions(value: string): Observable<Products[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }

  onChange(value) {
    this.getFilteredOptions(value).subscribe(
      (result) => {
        this.countSmart = result.filter(item => item.type === 'telephone').length;
        this.countSmartCover = result.filter(item => item.type === 'smart cover').length;
        this.countProtective = result.filter(item => item.type === 'protective menbrane').length;
        this.articles = result;
        console.log('result', result);
      },
      (error) => {
        console.log('error', error);
      }
    );
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

    // let result = this.search(value);
    // this.produits = result; 
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
    localStorage.setItem('langue', langue);
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

  navigate(pro: Products) {
    //this.router.navigateByUrl
    alert('' + this.router.url + '/smartphomes/' + pro.marque + '/' + pro._id)
  }
}
