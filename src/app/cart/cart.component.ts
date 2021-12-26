import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from './cart';
import { CartItem } from './cart.item';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart!: Cart;
  items!: CartItem[];

  constructor(private cartService: CartService,

    private router: Router) { }

  ngOnInit(): void {
    this.getCart();
  }

  public getCart(): void {
    this.cartService.get().subscribe(
      (response: Cart) => {
        this.cart = response;
        this.items = response.items;

        console.log(response);
        console.log("items: " + this.items[0]);
      }
    )
  }

  public remove(id: number): void {
    console.log(id);
    this.cartService.remove(id, 1).subscribe();
    this.reloadPage();
  }

  public orderCart(id: number): void {
    this.router.navigate(['/order-form', { productId: id }])
  }

  public orderSelected(): void {
    let ids = [];
    if (ids.length > 0) {
      ids = this.items.filter(x => x.isSelected === true);
      this.router.navigate(['/order-form', { productsIds: ids }])
    }
  }

  public selectItem(id: number): void {
    let cartItem = this.items.find(x => x.id === id);
    if (cartItem)
      cartItem.isSelected = true;

    console.log(cartItem?.isSelected);
  }

  reloadPage(): void {
    window.location.reload();
  }
}
