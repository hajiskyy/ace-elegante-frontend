import { Component, OnInit } from '@angular/core';
import { cart } from "../../models/Cart";
import { ProductsService } from "../../services/products.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: cart[];
  total: number;
  className: string;
  msg: string;
  constructor(private prodService: ProductsService) { }

  ngOnInit() {
    this.total = 0; //start total at zero

    // get cart items from product service 
    this.cart = this.prodService.getCart(); 
    this.gettotal(this.cart); // get initial total
  }

  // calculate total
  gettotal(cart: cart[]) {
    cart.forEach(item => {
      this.total += item.product.price * item.quantity;
    });
  }

  // add quantity
  addQuantity(cart: cart, e) {
    e.preventDefault();
    this.cart.forEach(item => {
      if (cart.id === item.id) {
        ++item.quantity;
      }
    });
    this.total = 0; // reset total
    this.gettotal(this.cart); // calculate total
  }

  // minus quantity
  minusQuantity(cart: cart, e) {
    e.preventDefault();
    this.cart.forEach(item => {
      if (cart.id === item.id) {
        if(item.quantity >= 2){ // check if item quantity is at least 2
          --item.quantity;
        }
      }
    });
    this.total = 0; // Reset total
    this.gettotal(this.cart); // calculate total
  }

  // Remove Item 
  removeItem(cart: cart, e){
    e.preventDefault();
    this.cart.forEach((item, index) => {
      if (cart.id === item.id) {
        this.cart.splice(index, 1);
      }
    });
    this.total = 0; // Reset total
    this.gettotal(this.cart); // calculate total

    //display notification
    this.alert("alert-info", "Item Removed" );
  }

  // Remove all items
  removeAll(){
    if(confirm('Are you sure?')){
      // clear cart
      this.cart = [];
      // reset total
      this.total = 0;
      //display notification
      this.alert("alert-info", "All items removed");
    }
  }

  // Notifcation
  alert(className: string, msg: string) {  
     this.className = className
     this.msg = msg;

     setTimeout(() => {
       this.className = "";
       this.msg = "";
     }, 2000);
  }

}
