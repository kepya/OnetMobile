import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { ModalComponent } from './components/modal/modal.component';
import { ProductComponent } from './components/product/product.component';
import { ReviewComponent } from './components/review/review.component';
import { SearchComponent } from './components/search/search.component';
import { UploadComponent } from './components/upload/upload.component';
import { FooterComponent } from './shares/footer/footer.component';
import { HeaderPaiementComponent } from './shares/headers/header-paiement/header-paiement.component';
import { HeaderComponent } from './shares/headers/header/header.component';
//https://www.npmjs.com/package/ngx-image-compress
const routes: Routes = [  
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },    
  { path: 'main', component: MainComponent } ,
  { path: 'dashboard', component: HomeComponent } ,
  { path: 'product', component: ProductComponent } ,
  { path: 'modal', component: ModalComponent } ,
  { path: 'review', component: ReviewComponent } ,
  { path: 'search', component: SearchComponent }  ,
  { path: 'checkout', component: CheckoutComponent } ,
  { path: 'header', component: HeaderComponent } ,
  { path: 'header-paiement', component: HeaderPaiementComponent } ,
  { path: 'footer', component: FooterComponent }  ,
  { path: 'produit-manager', component: UploadComponent } ,
  { path: 'produit-manager/:id', component: UploadComponent } ,
  { path: 'product/:id', component: ProductComponent } ,

]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
