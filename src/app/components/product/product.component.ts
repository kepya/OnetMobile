import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Commande } from 'src/app/models/commande';
import { Favoris } from 'src/app/models/favoris';
import { Like } from 'src/app/models/like';
import { Products } from 'src/app/models/products';
import { CommandeService } from 'src/app/shares/services/commande.service';
import { CommunService } from 'src/app/shares/services/commun.service';
import { LikeService } from 'src/app/shares/services/like.service';
import { ProductService } from 'src/app/shares/services/product.service';
import { ReviewService } from 'src/app/shares/services/review.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
 
  products: Products[] = [];
  productForBuy: Products[] = [];
  product = new Products();
  startLigthImg: string = '../../../assets/icons/VectorYellow.png';
  startDartImg: string = '../../../assets/icons/Vector.png';
  review = new Map<string, number>();
  startLigth: any[] = [];
  startDart: any[] = [];
  features: any[] = [];
  titre: string = 'description';
  quantite: number = 1;
  totaPrice: number = 0;
  showCart: boolean = false;
  favoris = new Favoris();
  constructor(private productService: ProductService, private route: ActivatedRoute, public communService: CommunService,
    private reviewService: ReviewService, private likeService: LikeService, private router: Router, private commandeService: CommandeService) { }

  ngOnInit(): void {
    if (this.route.snapshot.params['id']) {
      this.getProduct(this.route.snapshot.params['id']);
    } else {
      this.all();
    }
  }

  show(t) {
    this.titre = t;
  }

  like(p: Products) {
    let id = sessionStorage.getItem('idUser');
    if (id) {
      let like:Like = {
        idProduct: p._id,
        idUser: id
      }
  
      this.likeService.add(like).subscribe(
        (data) => {
          if (data instanceof Error) {
            alert(JSON.stringify(data));
          } else {
            alert(data.message)
          }
        },
        (error) => {
          console.log('Error', error);
        }
      );
    } else {
      alert('Veuillez vous connectez afin de liker');
    }
  }

  annuler() {
    this.totaPrice =0;
    this.productForBuy = [];
    this.quantite = 0;
    this.showCart = !this.showCart;
  }

  payCommande() {
    let commande = new Commande();
    commande.quantite = this.quantite;
    commande.product = this.productForBuy[0];
    commande.idProduct = commande.product._id;
    commande.prix = this.totaPrice;
    commande.dateCommande = new Date();

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

  showModal: boolean = false;

  getEvent(event) {
    if (event != null && event != '') {
      this.showModal = true;
    } else {
      this.showModal = false;
    }

    console.log('Event: ' + event);
  }

  buy(product) {
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

  select(p: Products) {
    this.product = p;
    this.getReview(p._id);
    this.getFavoris(p._id);
    let split = p.fonction.split("\n");
    this.features = split;
  }

  getFavoris(id: string) {
    this.likeService.find(id).subscribe(
      (data) => {
        if (data) {
          this.favoris = data;
        }
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }
  getReview(idProduct) {
    this.reviewService.findByProduct(idProduct).subscribe(
      (data) => {
        if (data != null && data.length > 0) {
          this.review.set(idProduct, data.length);
          console.log('review', this.review);
          
        }
      },
      (error) => {
        this.review.set(idProduct, 0);
        console.log('review', this.review);

        console.log('Error', error);
      }
    );
  }

  getFeatures(feature) {
    feature.split("\n");
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
          data.forEach(
            (p) => {
              this.getReview(p._id);
            }
          );
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
          this.select(data);
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
          data.forEach(
            (p) => {
              this.getReview(p._id);
            }
          );
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
