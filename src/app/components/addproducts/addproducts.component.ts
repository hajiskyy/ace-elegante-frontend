import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../../services/products.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent implements OnInit {
  name: string;
  description: string;
  price: string;
  discount: string;
  category: string;
  availability: string;
  brand: string;
  file: File;
  filename: string;

  constructor(private prodcutService: ProductsService, private flash: FlashMessagesService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.availability = 'true';
    this.category = "scarf";
    this.filename = "Choose File";
  }
  onCategoryChange(e) {
    this.category = e.target.value;
  }
  onAvailabilityChange(e) {
    if (e.target.value == "yes") {
      this.availability = 'true';
    } else {
      this.availability = 'false';
    }
  }
  onChangeFile(e) {
    this.file = <File>e.target.files[0];
    this.filename = this.file.name;
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
    if (this.validateName(this.name)) {
      if (this.validateName(this.description)) {
        const fd = new FormData();
        fd.append('name', this.name);
        fd.append('description', this.description);
        fd.append('price', this.price);
        fd.append('discount', this.discount);
        fd.append('category', this.category);
        fd.append('availability', this.availability);
        fd.append('brand', this.userService.getbrand());
        fd.append('file', this.file);

        this.prodcutService.addProduct(fd).subscribe(res => {
          if (res.success) {
            this.flash.show('Product Added', { cssClass: 'alert-success', timeout: 3000 });
            this.router.navigate(['dashboard'])
          } else {
            this.flash.show('Somehting went wrong', { cssClass: 'alert-danger', timeout: 3000 });
          }
        });
      } else {
        this.flash.show('invalid desrciption', { cssClass: 'alert-danger', timeout: 3000 });
      }

    } else {
      this.flash.show('Invalid name', { cssClass: 'alert-danger', timeout: 3000 });
    }

  }

}
