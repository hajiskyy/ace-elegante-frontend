import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { user } from "../../models/User";
import { res } from "../../models/message";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  onSubmit() {
    const login = {
      email: this.email,
      password: this.password
    }
    this.userService.login(login).subscribe(res => {
      console.log(res)
    })

  }

}
