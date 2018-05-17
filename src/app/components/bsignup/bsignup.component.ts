import { Component, OnInit } from '@angular/core';
import { BrandService } from "../../services/brand.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-bsignup',
  templateUrl: './bsignup.component.html',
  styleUrls: ['./bsignup.component.css']
})
export class BsignupComponent implements OnInit {
  ownerFirstName: string;
  ownerLastName: string;
  brandName: string;
  description: string;
  email: string;
  password: string;
  password2: string;
  address: string;
  phone: string;
  url: string;
  file: File;
  filename: string;
  constructor(private brandService: BrandService, private router: Router, private flash: FlashMessagesService) { }

  ngOnInit() {
    this.filename = "Choose file";
  }

  changeFile(e) {
    this.file = <File>e.target.files[0];
    this.filename = this.file.name;
  }
  validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  checkPassword() {
    if (this.password !== this.password2) {
      this.flash.show('passwords do not match', { cssClass: 'alert-danger', timeout: 1000 });
    } else {
      this.flash.show('passwords match', { cssClass: 'alert-success', timeout: 1000 });
    }
  }
  validateName(name) {
    if (name === undefined) {
      return false
    } else {
      let re = /^[^\\\/&]*$/;
      return re.test(name);
    }
  }
  onSubmit() {
    if (this.password !== this.password2 || this.password === undefined) {
      this.flash.show('Check Passwords', { cssClass: 'alert-danger', timeout: 800 });
    } else {
      if (this.validateEmail(this.email)) {
        if (this.validateName(this.ownerFirstName) && this.validateName(this.ownerLastName)) {
          if (this.validateName(this.brandName)) {
            const fd = new FormData();
            fd.append('ownerFirstName', this.ownerFirstName);
            fd.append('ownerLastName', this.ownerLastName);
            fd.append('brandName', this.brandName);
            fd.append('description', this.description);
            fd.append('email', this.email);
            fd.append('password', this.password)
            fd.append('address', this.address)
            fd.append('phone', this.phone);
            fd.append('url', this.url),
              fd.append('file', this.file, this.file.name);

            this.brandService.registerBrand(fd).subscribe(res => {
              if (res.success) {
                this.flash.show(res.msg, { cssClass: 'alert-success', timeout: 2000 })
                this.router.navigate(['login']);
              } else {
                this.flash.show('Somehting went wrong', { cssClass: 'alert-danger', timeout: 2000 });
              }
            })
          }else{
            this.flash.show('invalid Brand Name', { cssClass: 'alert-danger', timeout: 1500 });
          }

        } else {
          this.flash.show('Invalid Names', { cssClass: 'alert-danger', timeout: 1500 });
        }
      } else {
        this.flash.show('Invalid Email', { cssClass: 'alert-danger', timeout: 1500 });
      }
    }
  }



}
