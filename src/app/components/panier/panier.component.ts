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
    this.getCommandeByUser();

    if (this.product._id) {
      this.addCommande(this.product);
    }
  }

  getCommandeByUser() {
    let userId = this.user._id ? this.user._id : sessionStorage.getItem('idUser');

    this.service.findByUser(userId).subscribe(
      (data) => {
        if (data && data.length > 0) {
          this.commandes = data;
          let prix = data.map(x => x.prix);
          this.prixTotal = prix.reduce((x, y) => x + y);
        }
      },
      (error) => {
        alert(error.error);
        console.log('Error', error);
      }
    );
  }

  addCommande(product: Products) {
    this.commande.quantite = 1;
    this.commande.product = product;
    this.commande.idProduct = product._id;
    let userId = this.user._id ? this.user._id : sessionStorage.getItem('idUser');
    this.commande.idUser = userId;
    this.commande.prix = product.prixReduis;
    this.commande.dateCommande = new Date();

    this.service.create(this.commande).subscribe(
      (data) => {
        if (data) {
          alert(data);
          this.getCommandeByUser();
          this.commande  = new Commande();
        }
      },
      (error) => {
        alert(error.error);
        console.log('Error', error);
      }
    );
  }

  updateCommande(commande: Commande) {
    this.service.update(commande._id, commande).subscribe(
      (data) => {
        if (data) {
          this.commande  = new Commande();
          this.getCommandeByUser();
          alert(data);
        }
      },
      (error) => {
        alert(error.error);
        console.log('Error', error);
      }
    );
  }

  editer() {
    this.action = 'add';
  }

  remove(p: Commande) {
    this.service.delete(p._id).subscribe(
      (data) => {
        alert(data);
        let index = this.commandes.indexOf(p);
        this.commandes.splice(index, 1);
      },
      (error) => {
        alert(error.error);
        console.log('Error', error);
      }
    );
  }

  add(commande: Commande) {
    commande.quantite++;
    commande.prix += commande.product.prixReduis;
    this.prixTotal += commande.product.prixReduis;
    this.updateCommande(commande);
  }

  reduce(commande: Commande) {
    if (commande.quantite > 1) {
      commande.quantite--;
      commande.prix -= commande.product.prixReduis;
      this.prixTotal -= commande.product.prixReduis;
      this.updateCommande(commande);

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
