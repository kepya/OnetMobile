import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/shares/services/auth.service';
import { UserService } from 'src/app/shares/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user = new User();
  loginForm: FormGroup;
  signupForm: FormGroup;

  constructor(private service: AuthService, private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  login() {
    let value = this.loginForm.value;
    this.user.email = value.email;
    let password = value.password;
    console.log('Value', value);

    this.service.login(this.user.email, password).subscribe(
      (data) => {
        if(!(data instanceof Error)) {
          console.log('result', data);
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('idUser', data.userId);
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
        if(data instanceof Error) {
          alert("Erreur de création");
        } else {
          sessionStorage.setItem('user', JSON.stringify(data));
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

  signup() {
    let value = this.signupForm.value;
    this.user.lastName = value.lastName;
    this.user.firstName = value.firstName;
    this.user.email = value.email;
    this.user.phone = value.phone;
    this.user.region = value.region;
    this.user.address = value.address;
    this.user.state = value.state;
    this.user.password = value.password;
    this.user.type = 'utilisateur';

    console.log('Value', value);
    
    this.service.signup(this.user).subscribe(
      (data) => {
        this.findByEmail(this.user.email);
        console.log('result', data);
        alert('Utilisateur Crée');
        this.initForm();
        this.user = new User();
        if (data.typeUser === 'utilisateur') {
          this.router.navigateByUrl('/user-account');
        } else {
          this.router.navigateByUrl('/admin-account');
        }
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      state: ['', Validators.required],
      region: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.loginForm = this.formBuilder.group({
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }
}
