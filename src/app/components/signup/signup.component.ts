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
  password2: string
  email: string;

  constructor(private userService: UserService, private router: Router, private flash: FlashMessagesService) { }

  ngOnInit() {

  }
  validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
  checkPassword(){
    if(this.password !== this.password2){
      this.flash.show('passwords do not match',{ cssClass: 'alert-danger', timeout: 1000 })
    }else {
      this.flash.show('passwords match',{ cssClass: 'alert-success', timeout: 1000 })      
    }
  }
  validateName(name){
    if(name === undefined){
      return false
    }else{
      let re = /^[^\\\/&]*$/;
      return re.test(name);
    }
  }
  onSubmit() {
    if(this.password !== this.password2 || this.password === undefined){
      this.flash.show('Check Passwords',{ cssClass: 'alert-danger', timeout: 1500 });
    }else {
      if(this.validateEmail(this.email)){
        if(this.validateName(this.FirstName) && this.validateName(this.LastName)){
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
          });
        }else{
          this.flash.show('Invalid Names',{ cssClass: 'alert-danger', timeout: 1500 });
        }
      } else {
        this.flash.show('Invalid Email',{ cssClass: 'alert-danger', timeout: 1500 });
      }
    }
  }

}
