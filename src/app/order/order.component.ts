import { Component, Input, OnInit } from '@angular/core';
import { OrderRepresenatation } from '../models/order-representation';
import { OrderDetails } from '../models/order.details';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders!: OrderRepresenatation;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  public getAllOrders(): void {
    this.orderService.getAll().subscribe(
      response => {
        this.orders = response;
        console.log("orders: " + this.orders);
      },
      error => console.log(error)
    );
  }

}
