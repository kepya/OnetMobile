import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Commande } from 'src/app/models/commande';
import { Panier } from 'src/app/models/panier';
import { Products } from 'src/app/models/products';
import { User } from 'src/app/models/user';
import { CommandeService } from 'src/app/shares/services/commande.service';
import { PanierService } from 'src/app/shares/services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {

  @Input() user = new User();
  commandes: Commande[] = [];
  commande = new Commande();
  prixTotal = 0;
  @Input() action: string = 'show';
  products: Products[] = [];
  quantite= new Map<any, number>();
  @Input() product = new Products();
  @Output() out = new EventEmitter<string>();
  
  constructor(private service: CommandeService, private router: Router) { }

  ngOnInit(): void {
    let userId = sessionStorage.getItem('idUser');
    if (userId) {
      this.getCommandeByUser();

      if (this.product._id) {
        this.addCommande();
      }
    } else {
      this.router.navigateByUrl('/login');
    }

  }

  getCommandeByUser() {
    let userId = this.user._id ? this.user._id : sessionStorage.getItem('idUser');

    this.service.findByUser(userId).subscribe(
      (data) => {
        if (data && data.length > 0) {
          console.log('data', data);
          this.commandes = data;
          let products = data.map(x => x.product);
          this.addProducts(products);
          let prix = data.map(x => x.prix);
          this.prixTotal = prix.reduce((x, y) => x + y);
          console.log('commande',this.commandes);
        }
      },
      (error) => {
        alert(error.error);
        console.log('Error', error);
      }
    );
  }

  addCommande() {
    this.commande.quantite = 1;
    this.commande.product = this.product;
    this.commande.idProduct = this.product._id;
    let userId = this.user._id ? this.user._id : sessionStorage.getItem('idUser');
    this.commande.idUser = userId;
    this.commande.prix = this.product.prixReduis;
    this.commande.dateCommande = new Date();

    if (this.commande._id) {
      this.service.update(this.commande._id, this.commande).subscribe(
        (data) => {
          if (data) {
            this.getCommandeByUser();
            this.addProduct();
            alert(data);
          }
        },
        (error) => {
          alert(error.error);
          console.log('Error', error);
        }
      );
    } else {
      this.service.create(this.commande).subscribe(
        (data) => {
          if (data) {
            alert(data);
            this.getCommandeByUser();
            this.addProduct();
          }
        },
        (error) => {
          alert(error.error);
          console.log('Error', error);
        }
      );
    }
  }

  addProduct() {
    let v = new Set<Products>(this.products);
    v.add(this.product);
    this.products = [...v];
    this.quantite.set('' + this.product._id, this.commande.quantite)
  }
  
  addProducts(p: Products[]) {
    let v = new Set<Products>(p);
    v = new Set<Products>(this.products.concat(p));
    this.products = [...v];
    this.quantite.set('' + this.product._id, this.commande.quantite)
  }

  editer() {
    this.action = 'add';
  }

  remove(p: Products) {
    let userId = this.user._id ? this.user._id : sessionStorage.getItem('idUser');

    this.service.removeProduct(userId, p._id).subscribe(
      (data) => {
        if (data) {
          let index = this.products.findIndex(x => x._id === p._id);
          this.products.splice(index,1);
          alert(data);
        }
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  add(p: Products) {
    let commande = this.commandes.find(x => x.product._id === p._id);
    console.log('commande', commande);
    
    this.commande = commande;
    let q = this.quantite.get(p._id);
    this.quantite.set(p._id, q+1);
    console.log('prix', q);
    
    this.commande.prix = (q + 1) * p.prixReduis;
    this.addCommande();
  }

  reduce(p: Products) {

    let commande = this.commandes.find(x => x.product._id = p._id);
    this.commande = commande;
    let q = this.quantite.get(p._id);
 
    if (q != 1 && q > 1) {
      q--;
      this.quantite.set(p._id, q);
      this.commande.prix = q * this.product.prixReduis;
      this.addCommande();
    }
  }

  close() {
    this.out.emit('close');
  }

  annuler() {
    this.prixTotal =0;
    this.products = [];
    this.quantite = new Map<any, number>();
  }

  continue() {
    this.close();
  }

  buy() {
    this.router.navigateByUrl('/checkout');
  }
}
//https://www.delftstack.com/fr/howto/angular/angularjs-carousel/
