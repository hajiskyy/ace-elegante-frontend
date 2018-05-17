import { Component, OnInit } from '@angular/core';
import { BrandService } from "../../services/brand.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  brands: any[];
  constructor(private brandServe:BrandService, private router:Router) { }

  ngOnInit() {
    //get brands from brand servive
    this.brandServe.getBrands().subscribe(res => {
      this.brands = res.brands;
    })
  }
  brandStore(brand, e){
    e.preventDefault();
    this.router.navigate(['brand', brand]);
  }
}
