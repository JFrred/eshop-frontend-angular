import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order/order.service';
import { Product } from '../models/product';
import { ProductService } from '../product/product.service';
import { CartService } from '../cart/cart.service';
import { OrderFormItem } from '../order/order-form-item';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  items: OrderFormItem[] = [];
  ids!: number[] | undefined;

  constructor(private router: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.getIds();
    this.getProducts();
  }

  getIds(): void {
    let queryParams = this.router.snapshot.queryParamMap.get('cartItemIds');
    if (queryParams != null) {
      this.ids = JSON.parse(queryParams);
    }
    console.log(this.ids);
  }

  public getProducts(): void {      
    if (this.ids != null) {
      this.ids.forEach(id  => {
        this.cartService.getItem(id).subscribe(
          item => {
            this.items.push(item);
          }
        )
      });
    }
    console.log("products: " + this.items);
  }

  public save(productId: number): void {
    console.log("save(): id=" + productId);
    this.orderService.saveOne(productId, 1, "TRANSFER");
  }

  public buyNow(id: number, quantity: number, paymentType: string): void {
    this.orderService.saveOne(id, quantity, paymentType).subscribe();
  }
}