import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { Product } from '../models/product';
import { ProductService } from '../product/product.service';
import { AuthenticationService } from '../auth/services/auth.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    if (this.authService.isUserLoggedIn()) {
      this.getProduct();
      if (this.product)
        this.addToCart(this.product.id);
    }
  }

  getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService
      .getProduct(id)
      .subscribe((product) => this.product = product);
  }

  addToCart(id: number): void {
    this.cartService.add(id).subscribe();
  }
}
