import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { user } from "../../models/User";
import { res } from "../../models/message";
import { Router } from '@angular/router';
import { FlashMessagesService } from "angular2-flash-messages";

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

  constructor(private userService: UserService, private router: Router, private flash: FlashMessagesService) { }

  ngOnInit() {

  }
  onSubmit() {
    const user:user ={
      FirstName: this.FirstName,
      LastName: this.LastName,
      password: this.password,
      email: this.email
    }
    this.userService.registerUser(user).subscribe(res => {
      if(res.success){
        this.flash.show('You are now Registered and can now log in',{ cssClass: 'alert-success', timeout: 3000 })
        this.router.navigate(['login']);
      } else {
        this.flash.show('Something went wrong',{ cssClass: 'alert-danger', timeout: 3000 })
      }
    })
  }


}
