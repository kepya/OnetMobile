import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Products } from 'src/app/models/products';
import { ProductService } from 'src/app/shares/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
 
  products: Products[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.allProduct();
  }

  allProduct() {
    // let p: Products = {
    //   _id: '',
    //   type: 'telephone',
    //   nom: 'iPhone 6',
    //   description: '64GB HDD - 12 Months + Cover + Screen...',
    //   marque: 'Apple',
    //   prix: 159.900,
    //   image: '../../../assets/images/iphone.png',
    //   nombreEtoile: 3,
    //   tauxReduction: 20
    // }
    // this.add(p);
    // this.add(p);
    // this.add(p);
    // this.add(p);
    // this.add(p);
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

  open() {
    document.getElementById('content').classList.toggle('show')
  }
}
