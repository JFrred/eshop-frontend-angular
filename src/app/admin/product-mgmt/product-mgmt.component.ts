import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ProductMgmtService } from '../services/product-mgmt-service';

@Component({
  selector: 'app-product-mgmt',
  templateUrl: './product-mgmt.component.html',
  styleUrls: ['./product-mgmt.component.scss']
})
export class ProductMgmtComponent implements OnInit {
  isAdmin!: boolean;

  products!: Product[];
  message!: string;

  saveForm!: FormGroup;
  deleteForm!: FormGroup;
  editForm!: FormGroup;
  updateForm!: FormGroup;

  page= 0;
  itemsPerPage = 5;
  totalProducts!: number;

  constructor(private productMgmtService: ProductMgmtService,
    private productService: ProductService) {
  }

  ngOnInit(): void {
    // this.countProducts();
    this.getProducts(this.page);
  }

  public getProducts(page: number) {
    this.productService.getAll(page, this.itemsPerPage).subscribe(
      (data: any) => {
        this.products = data.products;
        this.totalProducts = data.size;
      }
    );
  }

  public delete(id: number) {
    let productName = this.products.find(p => p.id == id)?.name;
    if (confirm("'" + productName + "' will be deleted. \nAre you sure?")) {
      this.productMgmtService.delete(id).subscribe(
        response => this.message = response,
        error => console.log(error)
      );
      this.reloadPage();

    }
  }

  public refresh(id: number): void {
    this.productMgmtService.refreshDate(id).subscribe();
    this.reloadPage();
  }

  // countProducts(): void {
  //   this.productMgmtService.countAll().subscribe(
  //     response => {
  //       this.totalProducts = response;
  //       console.log("count: " + this.totalProducts);
  //     }
  //   );
  // }

  pageChanged(event: any) {
    this.page = event;
    this.getProducts(this.page - 1);
  }

  reloadPage(): void {
    window.location.reload();
  }
}

