import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss']
})
export class CategoryProductsComponent implements OnInit {
  products!: Product[];

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts() {
    const category = String(this.activatedRoute.snapshot.paramMap.get('name'));
    console.log(category);
    this.productService.getProductsByCategory(category).subscribe(
      (data: any) => {
        this.products = data;
        console.log(this.products);
      }
    );
  }
}
