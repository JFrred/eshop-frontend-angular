import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss']
})
export class CategoryProductsComponent implements OnInit {
  products!: Product[];

  constructor(private route: ActivatedRoute,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts() {
    const category = String(this.route.snapshot.paramMap.get('name'));
    console.log(category);
    this.productService.getProductsByCategory(category).subscribe(
      (data: any) => {
        this.products = data;
        console.log(this.products);
      }
    );
  }
}
