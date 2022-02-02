import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Commande } from 'src/app/models/commande';
import { Paiement } from 'src/app/models/paiment';
import { Products } from 'src/app/models/products';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/shares/services/auth.service';
import { Paiementervice } from 'src/app/shares/services/paiement.service';
import { ProductService } from 'src/app/shares/services/product.service';
import { UserService } from 'src/app/shares/services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  userForm: FormGroup;
  paiementForm: FormGroup;
  addressForm: FormGroup;

  formState: boolean = false;

  customer: number = 1;
  step: number = 1;

  user = new User();
  commande = new Commande();
  product = new Products();
  log: boolean = false;
  dateLivraisonLaPlusProche: Date = new Date();
  dateLivraisonLaPlusLointaine: Date;

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private authService: AuthService,
    private userService: UserService, private paiementService: Paiementervice, private router: Router) { }

  ngAfterViewInit(): void {
    this.checkCustomer(1);
  }

  ngOnInit(): void {
    this.getCommande();
    this.user.email = "franck@gmail.com";
    this.user.firstName = "Franck";
    this.user.lastName = "Libam";
    this.user.phone = "+243 336 364 833";
    this.formState = true;
    this.initForm();
    this.dateLivraisonLaPlusLointaine = new Date(this.dateLivraisonLaPlusProche.getFullYear() + '-' + (this.dateLivraisonLaPlusProche.getMonth() + 1) + '-' + (this.dateLivraisonLaPlusProche.getDate() + 7));
    // this.dateLivraisonLaPlusLointaine.setDate(this.dateLivraisonLaPlusProche.getDate() + 7);
    let token = sessionStorage.getItem('token');
    if (token) {
      this.customer = 2;
      this.findById(sessionStorage.getItem('idUser'));
      this.log = true;
      this.next();
      this.next();
    }

  }

  getCommande() {
    let value = localStorage.getItem('commande');
    if (value!=null && value != undefined) {
      this.commande = JSON.parse(value);
      this.getProduct(this.commande.idProduct);
    }
  }

  getProduct(id) {
    this.productService.find(id).subscribe(
      async (data) => {
        if (data) {
          console.log('product', data);
          this.product = data;
        }
      }, (error) => {
        console.log('Erreur', error);
        alert('Echec de la Modification\nErreur: ' + error.message);
      }
    );
  }

  initForm() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.userForm = this.formBuilder.group({
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.addressForm = this.formBuilder.group({
      state: ['', Validators.required],
      region: ['', Validators.required],
      address: ['', Validators.required],
    });

    this.paiementForm = this.formBuilder.group({
      paiement: ['', Validators.required]
    });
  }

  checkCustomer(id: number) {
    if (id === 1) {
      this.formState = true;
      this.customer = 1;
    } else {
      this.formState = false;

      this.customer = 2;
    }
  }

  login() {
    let value = this.userForm.value;
    this.user.email = value.email;
    this.user.password = value.password;
    console.log('Value', value);

    this.authService.login(this.user.email, this.user.password).subscribe(
      (data) => {
        if(!(data instanceof Error)) {
          console.log('result', data);
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('idUser', data.userId);
          this.log = true;
          this.findByEmail(this.user.email);
          alert('Authentification reussie');
        } else {
          alert('Echec d\'authentification');
        }
      },
      (error) => {
        console.log('Error', error);
      }
    );

  }

  findByEmail(email) {
    this.userService.findByEmail(email).subscribe(
      (data) => {
        if (data) {
          this.user = data;
          console.log('user', data);
        }
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  findById(id) {
    this.userService.find(id).subscribe(
      (data) => {
        if (data) {
          this.user = data;
          console.log('user', data);
        }
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  next() {
    this.step++;
  }

  addAddress() {
    let value = this.form.value;
    this.user.lastName = value.lastName;
    this.user.firstName = value.firstName;
    this.user.email = value.email;
    this.user.phone = value.phone;
    
    this.next();
  }

  choosePaiement() {
    let value = this.addressForm.value;
    this.user.region = value.region;
    this.user.address = value.address;
    this.user.state = value.state;
    this.user.type = 'utilisateur';
    console.log('Value', value);
    
    this.authService.signup(this.user).subscribe(
      (data) => {
        if(data instanceof Error) {
          alert("Erreur de création");
        } else {
          this.findByEmail(this.user.email);
          this.next();
        }
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  backStep() {
    this.step--;
  }

  buy() {
    let value = this.paiementForm.value;
    let modePaiement = value.paiement;
    
    let paiement:Paiement = {
      idCommande: this.commande._id,
      datePaiement: new Date(),
      prix: this.commande.prix,
      modePaiement: modePaiement,
      _id: '',
      idUser: this.user._id
    }

    this.paiementService.create(paiement).subscribe(
      (data) => {
        if (data) {
          alert('Paiement effectué avec success');
          localStorage.removeItem('commande');
          this.router.navigateByUrl('/dashboard');
        }
      },
      (error) => {
        alert('Erreur dans le paiement');
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
}
