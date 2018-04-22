import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from "rxjs/Observable";
import { res } from "../models/message";
import { user } from "../models/User";

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(user: user) {
    return this.http.post<res>('http://localhost:5000/user/register',user);
  }
  login(user) {
    return this.http.post<res>('http://localhost:5000/user/login',user);
  }

}
