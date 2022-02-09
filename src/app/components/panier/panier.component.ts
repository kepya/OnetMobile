import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
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
  @Input() action: string = 'add';
  products: Products[] = [];
  quantite= new Map<any, number>();
  @Input() product = new Products();
  @Output() out = new EventEmitter<string>();
  
  constructor(private service: CommandeService, private router: Router, protected dialogRef: NbDialogRef<PanierComponent>) { }

  ngOnInit(): void {
    // this.getCommandeByUser();

    if (this.product._id) {
      this.commande.quantite = 1;
      this.commande.product = this.product;
      this.commande.idProduct = this.product._id;
      this.commande.prix = this.product.prixReduis;

      this.commandes = JSON.parse(sessionStorage.getItem('panier'));
      let index = this.commandes.findIndex(x => x.idProduct === this.product._id);
      if (index > -1) {
        alert('Ce produit est déjà dans votre panier');
      } else {
        this.addCommande(this.commande);
      }
    }
  }

  addCommande(commande: Commande) {
    this.commandes = JSON.parse(sessionStorage.getItem('panier'));
    if (this.commandes != null && this.commandes != undefined && this.commandes.length > 0) {
      let index = this.commandes.findIndex(x => x.idProduct === commande.idProduct);
      if (index > -1) {

        this.commandes.splice(index, 1);
        this.commandes.push(commande);
      } else {
        this.commandes.push(commande);
      }
    } else {
      this.commandes = [];
      this.commandes.push(commande);
    }

    let prix = this.commandes.map(x => x.prix);
    this.prixTotal = prix.reduce((x, y) => x + y);
    this.commande = new Commande();
    sessionStorage.setItem('panier', JSON.stringify(this.commandes));
  }

  editer() {
    this.action = 'add';
  }

  remove(commande: Commande) {
    let index = this.commandes.findIndex(x => x.idProduct === commande.idProduct);
      if (index > -1) {
        this.commandes.splice(index, 1);
      }
  }

  add(commande: Commande) {
    commande.quantite++;
    commande.prix += commande.product.prixReduis;
    this.prixTotal += commande.product.prixReduis;
    this.addCommande(commande);
  }

  reduce(commande: Commande) {
    if (commande.quantite > 1) {
      commande.quantite--;
      commande.prix -= commande.product.prixReduis;
      this.prixTotal -= commande.product.prixReduis;
      this.addCommande(commande);
    } else {
      alert('Nous ne pouvons pas aller au dessous de 1');
    }
  }

  close() {
    this.dialogRef.close('ok');
    this.out.emit('close');

  }

  continue() {
    this.close();
  }

  buy() {
    this.router.navigateByUrl('/checkout');
  }
}
//https://www.delftstack.com/fr/howto/angular/angularjs-carousel/
