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
  category!: string;

  page = 0;
  itemsPerPage = 2;
  totalProducts!: number;

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService) {
  }

  ngOnInit(): void {
    this.category = String(this.activatedRoute.snapshot.paramMap.get('name'));
    this.getProducts(this.page);
  }

  public getProducts(page: number) {
    this.productService.getProductsByCategory(this.category, page, this.itemsPerPage).subscribe(
      (data: any) => {
        this.products = data.products;
        this.totalProducts = data.size;
      },
      error => console.log(error)
    );
  }

  pageChanged(event: any) {
    this.page = event;
    this.getProducts(this.page - 1);
  }
}
