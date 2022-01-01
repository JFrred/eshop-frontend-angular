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

  page!: number;
  itemsPerPage = 2;
  totalProducts!: number;

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.page = 0;
    this.getProducts(this.page);
  }

  public getProducts(page: number) {
    const category = String(this.activatedRoute.snapshot.paramMap.get('name'));
    // this.countProducts(category);
    this.productService.getProductsByCategory(category, page).subscribe(
      (data: any) => {
        this.products = data;
        this.countProducts(category);
      },
      error => console.log(error)
    );
  }

  countProducts(categoryName: string): void {
    this.productService.countCategoryProducts(categoryName).subscribe(
      response => {
        console.log(response);
        this.totalProducts = response;
        console.log("total: " + this.totalProducts);
      }
    );
  }

  pageChanged(event: any) {
    this.page = event;
    this.getProducts(this.page - 1);
    console.log("page=" + this.page);
  }
}
