import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductMgmtService } from '../services/product-mgmt-service';

@Component({
  selector: 'app-product-mgmt',
  templateUrl: './product-mgmt.component.html',
  styleUrls: ['./product-mgmt.component.scss']
})
export class ProductMgmtComponent implements OnInit {
  name!: string;
  animal!: string;

  products!: Product[];
  message!: string;

  saveForm!: FormGroup;
  deleteForm!: FormGroup;
  editForm!: FormGroup;
  updateForm!: FormGroup;


  constructor(private productMgmtService: ProductMgmtService,
    private activatedRoute: ActivatedRoute) {
    this.message = this.activatedRoute.snapshot.params['message'];
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      param => {
        this.message = param['message'];
        if (this.message) {
          console.log("mgmt message: " + this.message);
        }
      },
      error => console.log(error)
    );

    this.getProducts();
  }

  public getProducts() {
    this.productMgmtService.getAll().subscribe(
      (data: any) => {
        this.products = data;
        console.log(this.products);
      }
    );
  }

  public delete(id: number) {
    let productName = this.products.find(p => p.id == id)?.name;
    if (confirm("'" + productName + "' will be deleted. \nAre you sure?")) {
      console.log("checkpoint DELETE");
      this.productMgmtService.delete(id).subscribe(
        response => {
          this.message = response;
          console.log(this.message);
        },
        error => console.log(error)
      );
      this.reloadPage();

    }
  }

  reloadPage(): void {
    window.location.reload();
  }
}

