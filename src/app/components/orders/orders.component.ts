import { Component, OnInit } from '@angular/core';
import { OrdersService } from "../../services/orders.service";
import { Order } from "../../models/Order";
import { UserService } from "../../services/user.service";
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  order: Order[];
  brand: string;
  constructor(private orderService: OrdersService, private userService: UserService ) { }

  ngOnInit() {
    this.brand = this.userService.getbrand();
    this.orderService.getOrder(this.brand).subscribe(data => {
      this.order = data;
    });
  }

}
