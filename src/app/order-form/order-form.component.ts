import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { CartService } from '../services/cart.service';
import { OrderBillingAddress } from '../models/order-billing-address';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { OrderFormItem } from 'src/models/order-form-item';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  submitted: boolean = false;
  form!: FormGroup;
  items: OrderFormItem[] = [];
  ids!: number[] | undefined;
  totalPrice = 0;
  billingAddress!: OrderBillingAddress;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService,
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getIds();
    this.form = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      postalCode: ['', Validators.required],
      paymentType: ['', Validators.required]
    })
  }

  getIds(): void {
    let cartItemsIdsParam = this.activatedRoute.snapshot.queryParamMap.get('cartItemIds');
    if (cartItemsIdsParam) {
      this.ids = JSON.parse(cartItemsIdsParam);
      this.loadProducts();
    }
    else {
      let productIdParam = Number(this.activatedRoute.snapshot.queryParamMap.get('productId'));

      this.productService.getProduct(productIdParam)
      .subscribe(
        response => this.items.push(new OrderFormItem(response.id, response.name, 1, response.price)),
        error => console.log(error)
      );
    }
  }

  loadProducts(): void {
    if (this.ids != null) {
      this.ids.forEach(id => {
        console.log(id);
        this.cartService.getItem(id).subscribe(
          item => {
            this.items.push(new OrderFormItem(item.id, item.name, item.quantity, item.price));
            this.totalPrice += item.price * item.quantity;
          }
        )
      });
    }
  }

  public placeOrder(): void {
    this.submitted = true;
    console.log(this.form.value);
    console.log(this.items);

    if (this.form.invalid)
      return;

    let responseMessage!: string;

    this.orderService.save(this.items, this.form.value)
      .subscribe(
        data => {
          responseMessage = data;
          this.router.navigate(['/'], { queryParams: { message: responseMessage } });
        },
        error => {
          console.log(error);
        }
      );
  }

  public buyNow(id: number, quantity: number, paymentType: string): void {
    this.orderService.saveOne(id, quantity, paymentType).subscribe();
  }

  get f() {
    return this.form.controls;
  }
}