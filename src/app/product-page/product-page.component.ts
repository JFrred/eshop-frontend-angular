import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { AuthenticationService } from '../auth/services/auth.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  isLogged!: boolean;
  isAdmin!: boolean;
  product!: Product;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthenticationService
  ) {
    this.isLogged = this.authService.isUserLoggedIn();
    this.isAdmin = this.authService.isUserAdmin();
   }

  ngOnInit() {
    if (this.isLogged) {
      this.getProduct();
      if (this.product)
        this.addToCart(this.product.id);
    }
  }

  getProduct(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.productService
      .getProduct(id)
      .subscribe((product) => this.product = product);
  }

  addToCart(id: number): void {
    this.cartService.add(id).subscribe();
  }

  buyNow(id: number): void {
    const queryParam: any = {};
    queryParam.productId = JSON.stringify(this.product.id);
    const navigationExtras: NavigationExtras = {
      queryParams: queryParam
    };
    this.router.navigate(['/order-form'], navigationExtras);
  }
}
