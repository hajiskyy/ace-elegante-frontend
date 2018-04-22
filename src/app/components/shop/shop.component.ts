import { Component, OnInit } from '@angular/core';
import { Products } from "../../models/Products";
import { ProductsService } from "../../services/products.service";
import { Url } from 'url';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products: Products[];
  msg: string;
  className: string

  constructor(private prodService: ProductsService) { }

  ngOnInit() {
    this.products = this.prodService.getProducts();
    this.className = "";
    this.msg = "";
  }

  onSortChange(event: any){
    this.products = this.prodService.sortProducts(event.target.value);
  }

  addToCart(product: Products, e){
    e.preventDefault();
    this.prodService.addToCart(product);
    this.className = "alert-success";
    this.msg = "Added to cart";
    setTimeout(() => {
      this.className = "";
      this.msg = "";
    }, 1000);
  }

}
