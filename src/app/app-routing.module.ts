import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAccountComponent } from './components/admin-account/admin-account.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ModalComponent } from './components/modal/modal.component';
import { PaiementUserComponent } from './components/paiement-user/paiement-user.component';
import { PanierComponent } from './components/panier/panier.component';
import { ProductComponent } from './components/product/product.component';
import { RegisterComponent } from './components/register/register.component';
import { ReviewComponent } from './components/review/review.component';
import { SearchComponent } from './components/search/search.component';
import { UploadComponent } from './components/upload/upload.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { FooterComponent } from './shares/footer/footer.component';
import { HeaderPaiementComponent } from './shares/headers/header-paiement/header-paiement.component';
import { HeaderComponent } from './shares/headers/header/header.component';
//https://www.npmjs.com/package/ngx-image-compress
const routes: Routes = [  
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },   
  { path: 'dashboard', component: HomeComponent } ,
  { path: 'register', component: RegisterComponent } ,
  { path: 'login', component: LoginComponent } ,
  { path: 'review', component: ReviewComponent } ,
  { path: 'panier', component: PanierComponent }  ,
  { path: 'checkout', component: CheckoutComponent } ,
  { path: 'checkout/:idCommande', component: CheckoutComponent } ,
  { path: 'paiement-user', component: PaiementUserComponent } ,
  
  { path: 'admin-account', component: AdminAccountComponent } ,
  { path: 'header', component: HeaderComponent }  ,
  { path: 'produit-manager', component: UploadComponent } ,
  { path: 'produit-manager/:id', component: UploadComponent } ,
  { path: 'product/:id', component: ProductComponent } ,
  { path: 'modal', component: ModalComponent } ,

  { path: 'user-account', component: UserAccountComponent } ,
  { path: 'user-account/:page', component: UserAccountComponent } ,
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
