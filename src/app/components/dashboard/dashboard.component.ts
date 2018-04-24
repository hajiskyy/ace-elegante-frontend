import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../../services/products.service";
import { Products } from "../../models/Products";
import { user } from "../../models/User";
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: Products[];
  brand: string;
  constructor(private productServive: ProductsService, private userService: UserService) { }

  ngOnInit() {

    // implement brand login service
    this.brand = this.userService.getbrand();
    this.productServive.getProductsByBrand(this.brand).subscribe(products => {
      this.products = products;
    })
  }

}
