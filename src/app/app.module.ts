import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { ProductComponent } from './components/product/product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { SearchComponent } from './components/search/search.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ModalComponent } from './components/modal/modal.component';
import { HeaderComponent } from './shares/headers/header/header.component';
import { HeaderPaiementComponent } from './shares/headers/header-paiement/header-paiement.component';
import { FooterComponent } from './shares/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { UploadComponent } from './components/upload/upload.component';
import {NgxImageCompressService} from "ngx-image-compress";
import { ReviewComponent } from './components/review/review.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminAccountComponent } from './components/admin-account/admin-account.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { ArticleComponent } from './components/article/article.component';
import { PanierComponent } from './components/panier/panier.component';


const materialModules = [
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProductComponent,
    SearchComponent,
    CheckoutComponent,
    ModalComponent,
    HeaderComponent,
    HeaderPaiementComponent,
    FooterComponent,
    HomeComponent,
    UploadComponent,
    ReviewComponent,
    LoginComponent,
    RegisterComponent,
    AdminAccountComponent,
    UserAccountComponent,
    ArticleComponent,
    PanierComponent,
    // ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ...materialModules
  ],
  providers: [NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
