import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { CartService } from '../services/cart.service';
import { OrderBillingAddress } from '../models/order-billing-address';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartItem } from 'src/models/cart.item';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  submitted: boolean = false;
  form!: FormGroup;
  items: CartItem[] = [];
  ids!: number[] | undefined;
  totalPrice = 0;
  billingAddress!: OrderBillingAddress;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getIds();
    this.loadProducts();
    this.form = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      postalCode: ['', Validators.required],
    })
  }

  getIds(): void {
    let queryParams = this.activatedRoute.snapshot.queryParamMap.get('cartItemIds');
    if (queryParams != null) {
      this.ids = JSON.parse(queryParams);
    }
    console.log(this.ids);
  }

  loadProducts(): void {
    if (this.ids != null) {
      this.ids.forEach(id => {
        console.log(id);
        this.cartService.getItem(id).subscribe(
          item => {
            this.items.push(item);
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

    for (let item of this.items) {
      console.log("id: " + item.id);
    }

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