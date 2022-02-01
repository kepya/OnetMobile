import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/products';
import { CommunService } from 'src/app/shares/services/commun.service';
import { ProductService } from 'src/app/shares/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  elementSelectionner: number = 1;
  nombreReview: number = 36;
  listElement: any[] = [];
  imageBackground:string = '../../../assets/images/main.png';
  startLigthImg: string = '../../../assets/icons/VectorYellow.png';
  startDartImg: string = '../../../assets/icons/Vector.png';
  products: Products[] = [];
  startLigth: any[] = [];
  startDart: any[] = [];

  constructor(private productService: ProductService, public communService: CommunService) { }

  ngOnInit(): void {
    // let p: Products = {
    //   _id: '',
    //   type: 'telephone',
    //   nom: 'iPhone 6',
    //   description: '64GB HDD - 12 Months + Cover + Screen...',
    //   marque: 'Apple',
    //   prixReduis: 159.900,
    //   prixNormal: 159.900,
    //   image: '../../../assets/images/iphone.png',
    //   nombreEtoile: 3,
    //   tauxReduction: 20,
    //   fonction: ''
    // }
    // this.products.push(p);
    this.all();

    let e = [
      {
        url: '../../../assets/images/main.png',
        id: 1
      },
      {
        url: '../../../assets/images/image.png',
        id: 2
      },
      {
        url: '../../../assets/images/image3.png',
        id: 3
      },      {
        url: '../../../assets/images/main.png',
        id: 4
      },      {
        url: '../../../assets/images/main.png',
        id: 5
      }
    ];
    this.listElement = e;
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

  previous() {
    if (this.elementSelectionner > 1) {
      this.elementSelectionner--;
    } else {
      this.elementSelectionner = this.listElement.length;
    }

    this.imageBackground = this.listElement[this.elementSelectionner - 1].url;
    console.log('previous');
  }

  next() {
    if (this.elementSelectionner < this.listElement.length) {
      this.elementSelectionner++;
    } else {
      this.elementSelectionner = 1;
    }
    this.imageBackground = this.listElement[this.elementSelectionner - 1].url;
    console.log('next');
  }

  getStartLigth(nbre: number) {
    if (this.startLigth != null && this.startLigth != undefined && this.startLigth.length > 0) {
      return this.startLigth;
    } else {
      return Array(nbre).fill(4); // [4,4,4,4,4]
    }
  }

  getStartDark(nbre: number) {
    if (this.startLigth != null && this.startDart != undefined && this.startDart.length > 0) {
      return this.startDart;
    } else {
      return Array(nbre).fill(4); // [4,4,4,4,4]
    }
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

  searchByPercent(event) {
    alert('val: ' + event);
  }
}
