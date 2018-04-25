import { Component, OnInit } from '@angular/core';
import { Products } from "../../models/Products";
import { ProductsService } from "../../services/products.service";
import { FlashMessagesService } from "angular2-flash-messages";
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

  constructor(private prodService: ProductsService, private flash: FlashMessagesService) { }

  ngOnInit() {
    this.setProducts();
    this.className = "";
    this.msg = "";
  }
  setProducts() {
    this.prodService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  onSortChange(event: any) {
    if (event.target.value === "") {
      this.ngOnInit();
    } else {
      this.prodService.sortProducts(event.target.value).subscribe(products => {
        this.products = products;
      });
    }

  }

  addToCart(product: Products, e) {
    e.preventDefault();
    this.prodService.addToCart(product);
    this.flash.show('Added to Cart', { cssClass: 'alert-info', timeout: 3000 })
  }

}
