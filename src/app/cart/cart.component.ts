import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products/products.service';
import { Cart } from './cart';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart!: Cart;

  constructor(private cartService: CartService,
    private router: Router) { }

  ngOnInit(): void {
    this.getCart();
  }

  public getCart(): void {
    this.cartService.get().subscribe(
      (response: Cart) => {
        this.cart = response;

        console.log(response);
      }
    )
  }

  public buyFromCart(id: number): void {
    this.router.navigate(['/order-form', { productId: id }])
  }

  public remove(id: number): void {
    console.log(id);
    this.cartService.remove(id, 1).subscribe();
    this.reloadPage();
  }

  reloadPage(): void {
    window.location.reload();
  }
}
