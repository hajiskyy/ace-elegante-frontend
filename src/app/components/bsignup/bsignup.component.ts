import { Component, OnInit } from '@angular/core';
import { BrandService } from "../../services/brand.service";
import { Router } from "@angular/router";

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
  constructor(private brandService: BrandService, private router: Router) { }

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
      if(res.success){
        this.router.navigate(['login']);
      } else {
          // send message error message
      }
    })
  }

}
