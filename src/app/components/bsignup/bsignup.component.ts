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
  address: string;
  phone: string;
  url: string;
  file: File;
  constructor(private brandService: BrandService, private router: Router, private flash: FlashMessagesService) { }

  ngOnInit() {
  }

  changeFile(e) {
    this.file = <File>e.target.files[0];
  }
 
  onSubmit() {
    const fd = new FormData();
      fd.append('ownerFirstName',this.ownerFirstName);
      fd.append('ownerLastName', this.ownerLastName);
      fd.append('brandName', this.brandName);
      fd.append('description', this.description);
      fd.append('email', this.email);
      fd.append('password', this.password)
      fd.append('address', this.address)
      fd.append('phone', this.phone);
      fd.append('url', this.url),
      fd.append('file',this.file, this.file.name);

    this.brandService.registerBrand(fd).subscribe(res => {
      console.log(res);
      if(res.success){
        this.flash.show('Brand Registered, You can now log in',{ cssClass: 'alert-success', timeout: 3000 })
        this.router.navigate(['login']);
      } else {
        this.flash.show('Somehting went wrong',{ cssClass: 'alert-danger', timeout: 3000 })
      }
    })
  }

}
