import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { user } from "../../models/User";
import { res } from "../../models/message";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  FirstName: string;
  LastName: string;
  password: string;
  email: string;

  constructor(private userServive: UserService, private router: Router) { }

  ngOnInit() {

  }
  onSubmit() {
    const user:user ={
      FirstName: this.FirstName,
      LastName: this.LastName,
      password: this.password,
      email: this.email
    }
    this.userServive.registerUser(user).subscribe(res => {
      if(res.success){
        console.log(res);
        this.router.navigate(['login']);
      } else {
        console.log(res);
      }
    })
  }


}
