import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/services/auth.service';
import { Product } from 'src/app/models/product';
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


  constructor(private productMgmtService: ProductMgmtService,
    private authService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
 
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

  public refresh(id: number): void {
    this.productMgmtService.refreshDate(id).subscribe();
    this.reloadPage();
  }

  reloadPage(): void {
    window.location.reload();
  }
}

