import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-mgmt',
  templateUrl: './product-mgmt.component.html',
  styleUrls: ['./product-mgmt.component.scss']
})
export class ProductMgmtComponent implements OnInit {
  products!: Product[];
  message!: string;
 
  deleteForm!: FormGroup;
  editForm!: FormGroup;
  updateForm!: FormGroup;


  constructor(private productService: ProductService,
     private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts() {
    this.productService.getAll().subscribe(
      (data: any) => {
        this.products = data;
        console.log(this.products);
      }
    );
  }

  public delete(id: number): void {
    console.log("checkpoint DELETE");
    this.productService.delete(id).subscribe(
      response => {
        this.message = response;
        console.log(this.message);
      },
      error => console.log(error)
    );
    this.reloadPage();
  }

  reloadPage(): void {
    window.location.reload();
  }
}
