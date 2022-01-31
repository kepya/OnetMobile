import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';

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

  constructor(private formBuilder: FormBuilder) { }

  ngAfterViewInit(): void {
    this.checkCustomer(1);
  }

  ngOnInit(): void {
    this.user.email = "franck@gmail.com";
    this.user.firstName = "Franck";
    this.user.lastName = "Libam";
    this.user.phone = "+243 336 364 833";
    this.formState = true;
    this.initForm();
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
    let value = this.form.value;
    this.user.email = value.email;
    let password = value.password;
    console.log('Value', value);

  }

  addAddress() {
    let value = this.form.value;
    this.user.lastName = value.lastName;
    this.user.firstName = value.firstName;
    this.user.email = value.email;
    this.user.phone = value.phone;
    console.log('Value', value);

    this.step++;
  }

  choosePaiement() {
    let value = this.addressForm.value;
    this.user.region = value.region;
    this.user.address = value.address;
    this.user.state = value.state;
    console.log('Value', value);
    
    this.step++;
  }

  backStep() {
    this.step--;
  }

  buy() {
    let value = this.paiementForm.value;
    let paiement = value.paiement;
    console.log('Value', value);

  }
}
