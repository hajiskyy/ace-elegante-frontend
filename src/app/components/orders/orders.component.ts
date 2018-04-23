import { Component, OnInit } from '@angular/core';
import { OrdersService } from "../../services/orders.service";
import { Order } from "../../models/Order";
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  order: Order[];
  constructor(private orderService: OrdersService) { }

  ngOnInit() {
    this.orderService.getOrder().subscribe(data => {
      this.order = data;
    });
  }

}
