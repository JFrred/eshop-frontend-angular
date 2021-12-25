import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { Product } from '../models/product';
import { ProductService } from '../product/product.service';
import { AuthenticationService } from '../auth/services/auth.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  product!: Product;
  isAuthenticated = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.getProduct();
    this.isAuthenticated = this.authService.isUserLoggedIn();
    console.log("isAuthenticated=" + this.isAuthenticated);
    if (this.isAuthenticated) {
      this.addToCart(this.product.id);
      console.log("done");
    }
  }

  getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService
      .getProduct(id)
      .subscribe((product) => this.product = product); // TODO refactor to getter
  }
    
  addToCart(id: number | undefined): void {
    console.log("called add to cart id=" + id);
    this.cartService.addProduct(id);
  }
}
