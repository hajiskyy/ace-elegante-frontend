import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { res } from "../models/message";
import { user } from "../models/User";
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private router: Router) {
  }
  buyer: boolean;
  seller: boolean;

  registerUser(user: user) {
    return this.http.post<res>('/user/register', user);
  }
  login(user) {
    return this.http.post<any>('/user/login', user);
  }
  logOut() {
    this.loggedIn("out");
    localStorage.clear();
    this.router.navigate(['home']);
  }
  setbrand(brand: string){
    localStorage.setItem('brand',brand);
  }
  getbrand() {
    return localStorage.getItem('brand');
  }

  loggedIn(user: string) {
    if (user === "buyer") {
      localStorage.setItem('logged','buyer');
    } else if(user === "seller") {
      localStorage.setItem('logged','seller');
    }
  }
  auth(){
    let buyer: boolean;
    let seller: boolean;
    let logged = localStorage.getItem('logged');

    if(logged === "buyer"){
      return {
        buyer: true,
        seller: false
      }
    } else if (logged === "seller") {
      return {
        buyer: false,
        seller: true
      }
    } else {
      return {
        buyer: false,
        seller: false
      }
    }
    
    
  }


}
