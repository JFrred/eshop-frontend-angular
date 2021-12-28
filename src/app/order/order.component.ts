import { Component, OnInit } from '@angular/core';
import { OrderDetails } from '../models/order.details';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders!: OrderDetails[];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  public getAllOrders(): void {
    this.orderService.getAll().subscribe(
      (response: OrderDetails[]) => {
        this.orders = response;
        console.log("orders: " + this.orders);
      },
      (error: Error) => console.log(error)
    );
  }

  public orderNow(productId: number, quantity: number, paymentType: string): void {
    this.orderService.orderOne(productId, quantity, paymentType);
  }
}
