import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../models/Order';
import { Observable } from "rxjs/Observable";



@Injectable()
export class OrdersService {
  brand: string;
  constructor(private http: HttpClient) {
    this.brand = 'hajai';
   }
  getOrder(): Observable<any[]>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any[]>(`http://localhost:5000/order/getorders/${this.brand}`, {headers: headers});
  }

}
