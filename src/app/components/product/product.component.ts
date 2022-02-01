import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/models/products';
import { CommunService } from 'src/app/shares/services/commun.service';
import { ProductService } from 'src/app/shares/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
 
  products: Products[] = [];
  product = new Products();
  startLigthImg: string = '../../../assets/icons/VectorYellow.png';
  startDartImg: string = '../../../assets/icons/Vector.png';
  nombreReview = 1;
  startLigth: any[] = [];
  startDart: any[] = [];

  constructor(private productService: ProductService, private route: ActivatedRoute, public communService: CommunService) { }

  ngOnInit(): void {
    if (this.route.snapshot.params['id']) {
      this.getProduct(this.route.snapshot.params['id']);
    } else {
      this.all();
    }
  }

  showModal: boolean = false;

  getEvent(event) {
    if (event != null && event != '') {
      this.showModal = true;
    } else {
      this.showModal = false;
    }

    console.log('Event: ' + event);
  }

  
  getStartLigth(nbre: number) {
    if (this.startLigth != null && this.startLigth != undefined && this.startLigth.length > 0) {
      return this.startLigth;
    } else {
      if (nbre > 1) {
        return Array(nbre).fill(4); // [4,4,4,4,4]
      } else{
        return [1];
      }
    }
  }

  getStartDark(nbre: number) {
    nbre = 5 - nbre;
    if (this.startLigth != null && this.startDart != undefined && this.startDart.length > 0) {
      return this.startDart;
    } else {
      if (nbre > 1) {
        return Array(nbre).fill(4); // [4,4,4,4,4]
      } else{
        return [1];
      }
    }
  }

  all() {
    this.productService.all().subscribe(
      (data) => {
        if (data != null && data.length > 0) {
          this.products = data;
          console.log('products', data);
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

  getProduct(id) {
    this.productService.find(id).subscribe(
      async (data) => {
        if (data) {
          console.log('product', data);
          this.product = data;
          this.getProducts(data.marque);
        }
      }, (error) => {
        console.log('Erreur', error);
        alert('Echec de la Modification\nErreur: ' + error.message);
      }
    );
  }

  getProducts(marque: String) {
    this.productService.findByMarque(marque).subscribe(
      (data) => {
        if (data != null && data.length > 0) {
          this.products = data;
          console.log('products', data);
        }
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }
}
