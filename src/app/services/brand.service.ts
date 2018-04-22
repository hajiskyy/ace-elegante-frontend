import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from "rxjs/Observable";
import { res } from "../models/message";


@Injectable()
export class BrandService {
  constructor(private http: HttpClient) {

   }

   registerBrand(brand: FormData) {
     return this.http.post<res>('http://localhost:5000/brand/addbrand',brand);
   }

}
