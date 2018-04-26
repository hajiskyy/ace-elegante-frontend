import { Component, OnInit } from '@angular/core';
import { cart } from "../../models/Cart";
import { ProductsService } from "../../services/products.service";
import { OrdersService } from "../../services/orders.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Order } from "../../models/Order";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: cart[];
  total: number;
  order: Order[]
  constructor(private prodService: ProductsService, private flash: FlashMessagesService, private orderServe: OrdersService) { }

  ngOnInit() {
    this.total = 0; //start total at zero
    // get cart items from cart
    this.getCart();
    this.gettotal(this.cart); // get initial total

    // init order array
    this.order = [];
  }

  // calculate total
  gettotal(cart: cart[]) {
    cart.forEach(item => {
      this.total += item.product.price * item.quantity;
    });
  }
  setCart(){
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  getCart(){
    this.cart =  this.cart = JSON.parse(localStorage.getItem('cart'))
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
    this.setCart();
    this.getCart()
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
    this.setCart();
    this.getCart()
    this.gettotal(this.cart); // calculate total
  }

  // Remove Item 
  removeItem(cart: cart, e){
    e.preventDefault();
   this.getCart();
    this.cart.forEach((cart, index) => {
      if(cart.id === cart.id){
        this.cart.splice(index, 1);
      }
    });
    // update cart
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.total = 0; // Reset total
    // get cart again
    this.getCart();
    this.gettotal(this.cart); // calculate total

    //display notification
    this.flash.show('Item removed',{ cssClass: 'alert-info', timeout: 3000 })
  }

  // Remove all items
  removeAll(){
    if(confirm('Are you sure?')){
      // clear cart
      localStorage.removeItem('cart');
      this.cart = [];
      // reset total
      this.total = 0;
      //display notification
      this.flash.show('All items removed',{ cssClass: 'alert-success', timeout: 3000 })
    }
  }

  placeOrder(){
    // init order
    let order: Order;
     order = {
      quantity: 1,
      brandName: "",
      product :"",
      user: ""
    }
    //update cart
    this.getCart();
    let user = JSON.parse(localStorage.getItem('user')); 
    //loop and add needed cart info to order
    this.cart.forEach(item => {
      order = {
        quantity: item.quantity,
        brandName: item.product.brand,
        product :item.product._id,
        user: user._id
      }
      console.log(order);
      this.order.push(order);
    });

    this.orderServe.placeOrder(this.order).subscribe(res => {
      if(res.success){
        this.flash.show(res.msg,{ cssClass: 'alert-success', timeout: 3000 });
        localStorage.removeItem('cart');
        this.cart = [];
        this.order = [];

      } else {
        this.flash.show('Some thing went wrong',{ cssClass: 'alert-danger', timeout: 3000 });
      }
    })
    
  }

}
