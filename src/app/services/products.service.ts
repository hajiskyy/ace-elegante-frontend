import { Injectable } from '@angular/core';
import { Products } from "../models/Products";
import { cart } from "../models/Cart";
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Injectable()
export class ProductsService {
  products: Products[];
  sorted: Products[];
  cart: cart[];
  constructor(private http: HttpClient) {
    this.products = []
    this.sorted = [];
    this.cart = [];
  }

  getProducts() {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
     return this.http.get<any>('http://localhost:5000/products/getproducts', {headers: headers})
  }

  sortProducts(sort: string) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>(`http://localhost:5000/products/getproducts/${sort}`, {headers: headers})
  }

  // addToCart(product: Products){
  //   this.cart.forEach((item, index) => {
  //     if(item.id === product.id){
  //       ++item.quantity;
  //       this.cart.splice(index, 1);
  //     }
  //   });
  //   this.cart.push(product);
    
  // }

  // getCart(){
  //   return this.cart;
  // }

  addProduct(product: FormData){
    return this.http.post('http://localhost:5000/products/addproduct',product);
  }

}
