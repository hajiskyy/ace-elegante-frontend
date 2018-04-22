import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { HttpModule } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Brand } from "../models/Brand";
import { res } from "../models/message";
import 'rxjs/add/operator/map';

@Injectable()
export class BrandService {
  constructor(private http: HttpClient) {

   }

   registerBrand(brand: FormData) {
     return this.http.post<res>('http://localhost:5000/brand/addbrand',brand);
   }

}
