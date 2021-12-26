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
  products: Product[] = [];
  ids!: number[] | undefined;

  constructor(private router: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.getIds();
    this.getProducts();
  }

  getIds(): void {
    this.ids = this.router.snapshot.paramMap.get('ids')?.split(',')
    .map(item => {
      return parseInt(item);
    });
    console.log(this.ids);
  }

  public getProducts(): void {      
    if (this.ids != null) {
      console.log("checkpoint");
      this.ids.forEach(id => {
        console.log("id:"  +id);
        let product!: Product;
        this.productService.getProduct(id).subscribe(
          (response: Product) => {
            this.products.push(response);
            console.log("prod: " + product);
          }
        );
        (product);
      })
    }
    console.log("products: " + this.products);
  }

  public save(productId: number): void {
    console.log("save(): id=" + productId);
    this.orderService.saveOne(productId, 1, "TRANSFER");
  }

  public buyNow(id: number, quantity: number, paymentType: string): void {
    this.orderService.saveOne(id, quantity, paymentType).subscribe();
  }
}