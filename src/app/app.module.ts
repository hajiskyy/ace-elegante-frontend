import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/Forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from '@angular/router';
import { ProductsService } from "./services/products.service";
import { BrandService } from "./services/brand.service";


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BsignupComponent } from './components/bsignup/bsignup.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { CartComponent } from './components/cart/cart.component';
import { AboutComponent } from './components/about/about.component';
import { ShopComponent } from './components/shop/shop.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { UserService } from './services/user.service';
import { AddproductsComponent } from './components/addproducts/addproducts.component';
import { ViewproductsComponent } from './components/viewproducts/viewproducts.component';
import { OrdersService } from './services/orders.service';
import { OrdersComponent } from './components/orders/orders.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'bsignup', component: BsignupComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'cart', component: CartComponent },
  { path: 'about', component: AboutComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'addproducts', component: AddproductsComponent },
  { path: 'products', component: ViewproductsComponent },
  { path: 'orders', component: OrdersComponent },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    BsignupComponent,
    HomeComponent,
    ContactComponent,
    CartComponent,
    AboutComponent,
    ShopComponent,
    PagenotfoundComponent,
    AddproductsComponent,
    ViewproductsComponent,
    OrdersComponent,
    DashboardComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ProductsService, BrandService, UserService, OrdersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
