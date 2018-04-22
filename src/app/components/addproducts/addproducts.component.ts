import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../../services/products.service";

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent implements OnInit {
  name:string;
  description:string;
  price:string;
  discount: string;
  category: string;
  availability: string;
  brand: string;
  file: File;

  constructor(private prodcutService: ProductsService) { }

  ngOnInit() {
    this.availability = 'true';
  }
  onCategoryChange(e){
    this.category = e.target.value;
  }
  onAvailabilityChange(e){
    if(e.target.value == "yes"){
      this.availability = 'true';
    } else {
      this.availability = 'flase';
    }
  }
  onChangeFile(e){
    this.file = <File>e.target.files[0];
  }
  onSubmit(){
    const fd = new FormData();
    fd.append('name', this.name);
    fd.append('description', this.description);
    fd.append('price', this.price);
    fd.append('discount',this.discount);
    fd.append('category', this.category);
    fd.append('availability', this.availability);
    // Check Here
    fd.append('brand', 'hajai');
    fd.append('file', this.file);

    this.prodcutService.addProduct(fd).subscribe(res => {
      // TODO
      console.log(res);
    });

  }

}
