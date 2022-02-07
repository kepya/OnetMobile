import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Commande } from 'src/app/models/commande';
import { Products } from 'src/app/models/products';
import { CommandeService } from 'src/app/shares/services/commande.service';
import { CommunService } from 'src/app/shares/services/commun.service';
import { ProductService } from 'src/app/shares/services/product.service';
import { ReviewService } from 'src/app/shares/services/review.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  elementSelectionner: number = 1;
  // nombreReview: number = 0;
  review = new Map<string, number>();
  listElement: any[] = [];
  imageBackground:string = '../../../assets/images/main.png';
  startLigthImg: string = '../../../assets/icons/VectorYellow.png';
  startDartImg: string = '../../../assets/icons/Vector.png';
  products: Products[] = [];
  product_search: Products[] = [];
  startLigth: any[] = [];
  startDart: any[] = [];
  product = new Products();

  bestProduct: Products[] = [];
  onSaleProduct: Products[] = [];
  newArrivalProduct: Products[] = [];

  constructor(private productService: ProductService, public communService: CommunService, private reviewService: ReviewService,
    private commandeService: CommandeService, private router: Router) { }

  ngOnInit(): void {
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
    // this.getResolution();
  }



  getEvent(event) {
    sessionStorage.setItem('route', '/');
    if (event != null && event != '') {
      this.showCart = true;
    } else {
      this.showCart = false;
    }

    console.log('Event: ' + event);
  }

  getResolution() {
    alert("Votre résolutio est sur x : " + screen.width + ' votre résolution sur y : ' + screen.height)
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

  titre: string = 'description';
  quantite: number = 1;
  totaPrice: number = 0;
  showCart: boolean = false;
  productForBuy: Products[] = [];

  annuler() {
    this.totaPrice =0;
    this.productForBuy = [];
    this.quantite = 0;
    this.showCart = !this.showCart;
  }

  buy(product) {
    this.product = product;
    this.showCart = !this.showCart;
    this.productForBuy.push(product);
    this.totaPrice+=product.prixReduis;
  }

  add(prix) {
    this.quantite++;
    this.totaPrice+=prix;
  }

  reduce(prix) {
    this.quantite--;
    this.totaPrice-=prix;
  }

  payCommande() {
    let commande = new Commande();
    commande.quantite = this.quantite;
    commande.idProduct = this.productForBuy[0]._id;
    commande.prix = this.totaPrice;
    commande.dateCommande = new Date();

    localStorage.setItem('commande', JSON.stringify(commande));
    this.commandeService.create(commande).subscribe(
      (data) => {
        this.annuler();
        this.router.navigateByUrl('/checkout');
      },
      (error) => {
        this.annuler();
        alert('Votre commande n\'a pas été prise en compte ressayer plus tard')
        console.log('Error', error);
      }
    );
    
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

  
  getReview(idProduct) {
    this.reviewService.findByProduct(idProduct).subscribe(
      (data) => {
        if (data != null && data.length > 0) {
          this.review.set(idProduct, data.length);
        }
      },
      (error) => {
        this.review.set(idProduct, 0);
        console.log('Error', error);
      }
    );
  }

  all() {
    this.productService.all().subscribe(
      (data) => {
        if (data != null && data.length > 0) {
          data.forEach((p) => {
            this.getReview(p._id);
          })
          this.products = data;
          this.bestProduct = data.slice(0, 5);
          this.onSaleProduct = data.slice(5, 10);
          this.newArrivalProduct = data.slice(10, 15);
          if (this.newArrivalProduct.length==0) {
            this.newArrivalProduct = data.slice(0, 5);
          }
          console.log('best', this.bestProduct);
          
        }
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  close() {
    this.showCart = false;
  }
  searchByPercent(event) {
    this.product_search = this.products;
    let result = this.products.filter(x => x.tauxReduction === parseInt(event, 10));
    this.products = result;
    console.log('result', this.products);
  }
}
