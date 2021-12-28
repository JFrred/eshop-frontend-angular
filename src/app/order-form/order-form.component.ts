import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order/order.service';
import { CartService } from '../cart/cart.service';
import { OrderFormItem } from 'src/models/order-form-item'; 
import { OrderBillingAddress } from '../models/order-billing-address';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartItem } from 'src/models/cart.item';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
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
    // if (this.form.invalid) {
    //   return;
    // }
    console.log(this.form.value);
    console.log(this.items);

    for (let item of this.items) {
      console.log("id: " + item.id);
     }

    this.orderService.save(this.items, this.form.value)
      // .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        error => {
          console.log(error);
        }
      );
  }

  public buyNow(id: number, quantity: number, paymentType: string): void {
    this.orderService.saveOne(id, quantity, paymentType).subscribe();
  }
}