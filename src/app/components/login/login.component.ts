import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { FlashMessagesService } from "angular2-flash-messages";
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

  constructor(private userService: UserService, private router: Router, private flash: FlashMessagesService) { }
  user: any;
  ngOnInit() {
  }
  onSubmit() {
    const login = {
      email: this.email,
      password: this.password
    }
    this.userService.login(login).subscribe(res => {
      if(res.success){
        this.user = res.user;
        if(res.user.hasBrand){
          this.userService.loggedIn("seller");
          this.userService.setbrand(res.brand);
          this.flash.show('You are now logged in',{ cssClass: 'alert-success', timeout: 3000 })
          this.router.navigate(['dashboard']);
        } else {
          this.userService.loggedIn("buyer");
          this.flash.show('You are now logged in',{ cssClass: 'alert-success', timeout: 3000 })
          this.router.navigate(['shop']);
        }
      }else{
        this.flash.show('Wrong Password',{ cssClass: 'alert-danger', timeout: 3000 })

      }
    })

  }

}
