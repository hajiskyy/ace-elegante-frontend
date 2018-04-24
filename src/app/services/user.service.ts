import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from "rxjs/Observable";
import { res } from "../models/message";
import { user } from "../models/User";
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private router: Router) {
  }
  brand: string;
  buyer: boolean;
  seller: boolean;

  registerUser(user: user) {
    return this.http.post<res>('http://localhost:5000/user/register', user);
  }
  login(user) {
    return this.http.post<any>('http://localhost:5000/user/login', user);
  }
  logOut() {
    this.loggedIn("out");
    this.router.navigate(['home']);
  }
  setbrand(brand: string){
    this.brand = brand;
  }
  getbrand() {
    return this.brand;
  }

  loggedIn(user: string) {
    if (user === "buyer") {
      this.buyer = true;
      this.seller = false;
    } else if(user === "seller") {
      this.buyer = false;
      this.seller = true;
    } else {
      this.buyer = false;
      this.seller = false;
    }
  }
  auth(){
    let buyer: boolean;
    let seller: boolean;
    
    return {
      buyer: this.buyer,
      seller: this.seller
    }
  }


}
