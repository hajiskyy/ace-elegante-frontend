import { Injectable } from '@angular/core';
import { Products } from "../models/Products";
import { cart } from "../models/Cart";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";


@Injectable()
export class ProductsService {
  products: any[];
  sorted: Products[];
  constructor(private http: HttpClient) {
    this.products = []
    this.sorted = [];
  }

  getProducts() {
    // let headers = new HttpHeaders().set('Content-Type', 'application/json');
     return this.http.get<any>('/products/getproducts')
  }

  sortProducts(sort: string) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>(`/products/getproductsCategory/${sort}`, {headers: headers})
  }
  getProductsByBrand(brand: string) {
    // let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>(`/products/getproductsBrand/${brand}`);
  }

  addToCart(product: Products){
    let cart: cart[] = [];
    if(JSON.parse(localStorage.getItem('cart')) !== null){
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    
    let newCart: cart;
    newCart = {
      id: product._id,
      quantity: 1,
      product: product
    }
    cart.push(newCart);
    localStorage.setItem('cart',JSON.stringify(cart));
  }

  getProductById(id: string){
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>(`/products/getproduct/${id}`, {headers: headers});
  }

  getProductRating(product: string): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(`/rating/${product}`, {headers: headers});
  }

  addProduct(product: FormData){
    return this.http.post<any>('/products/addproduct',product);
  }

  addRating(rating: any){
    return this.http.post<any>('/rating/add',rating);
  }

}
