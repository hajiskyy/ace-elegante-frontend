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
    this.setProducts();
    this.className = "";
    this.msg = "";
  }
  setProducts(){
    this.prodService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  onSortChange(event: any){
    this.prodService.sortProducts(event.target.value).subscribe(products => {
      this.products = products;
    });
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
