import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../../services/products.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Products } from "../../models/Products";

@Component({
  selector: 'app-view-brand-products',
  templateUrl: './view-brand-products.component.html',
  styleUrls: ['./view-brand-products.component.css']
})
export class ViewBrandProductsComponent implements OnInit {
  products: Products[];
  param: string
  constructor(
    private activated: ActivatedRoute, 
    private router: Router,
    private flash: FlashMessagesService,
    private prodService: ProductsService
  ) { }

  ngOnInit() {
    this.activated.params.subscribe(param => {
      this.param = param.brand
      });
    
    this.prodService.getProductsByBrand(this.param).subscribe(products => {
      this.products = products;
    });

  }

  viewProduct(id){
    this.router.navigate(['product',id]);
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
