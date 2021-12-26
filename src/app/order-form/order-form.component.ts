import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order/order.service';
import { Product } from '../models/product'; 
import { ProductService } from '../product/product.service'; 

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  product!: Product;
  id!: number;

  constructor(private router: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.getProduct();
  }

  public getProduct(): void {
    this.router.queryParams.subscribe(
      params => {
        this.id = params['productId'];
        console.log("id: " + this.id);
      });

    this.productService.getProduct(this.id).subscribe(
      (response: any) => {
        this.product = response;
        console.log(this.product);
      }
    );
  }

  public save(productId:number): void {
    console.log("save(): id=" + productId);
    this.orderService.saveOne(productId, 1, "TRANSFER");
  }

  public buyNow(id: number, quantity: number, paymentType: string): void {
    this.orderService.saveOne(id, quantity, paymentType).subscribe();
  }
}