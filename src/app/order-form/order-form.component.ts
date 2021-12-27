import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order/order.service';
import { Product } from '../models/product';
import { ProductService } from '../product/product.service';
import { CartService } from '../cart/cart.service';
import { OrderFormItem } from '../order/order-form-item';
import { OrderBillingAddress } from '../models/order-billing-address';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  items: OrderFormItem[] = [];
  ids!: number[] | undefined;
  totalPrice = 0;
  billingAddress!: OrderBillingAddress;

  constructor(private router: ActivatedRoute,
    private cartService: CartService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  getIds(): void {
    let queryParams = this.router.snapshot.queryParamMap.get('cartItemIds');
    if (queryParams != null) {
      this.ids = JSON.parse(queryParams);
    }
    console.log(this.ids);
  }

  loadProducts(): void {      
    this.getIds();
    if (this.ids != null) {
      this.ids.forEach(id  => {
        this.cartService.getItem(id).subscribe(
          item => {
            this.items.push(item);
            this.totalPrice += item.price * item.quantity;
          }
        )
      });
    }
    console.log("total : " + this.totalPrice);
    console.log("products: " + this.items);
  }

  public save(billingAddress: OrderBillingAddress): void {
    // if (fullName!= null && email != null && city != null && street != null && postalCode != null) 
      //  this.billingAddress = new OrderBillingAddress(fullName, email, city, street, postalCode);
    let idsWithQuantity = new Map<number, number>();
    this.orderService.saveAll(this.items, this.billingAddress);
    console.log()
  }

  public buyNow(id: number, quantity: number, paymentType: string): void {
    this.orderService.saveOne(id, quantity, paymentType).subscribe();
  }
}