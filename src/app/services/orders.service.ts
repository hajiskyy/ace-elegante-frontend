import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../models/Order';
import { Observable } from "rxjs/Observable";



@Injectable()
export class OrdersService {
  brand: string;
  constructor(private http: HttpClient) {
   }
  getOrder(brand: string): Observable<any[]>{
    // let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any[]>(`/order/getorders/${brand}`);
  }

  placeOrder(order:Order[]){
    // let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>('/order/place', order);
  }

}
