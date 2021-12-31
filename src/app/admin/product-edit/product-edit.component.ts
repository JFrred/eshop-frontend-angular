import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ProductMgmtService } from '../services/product-mgmt-service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  editForm!: FormGroup;
  submitted!: boolean;

  id!: number;
  name!: string;
  description!: string;
  category!: string;
  imgUrl!: string;
  price!: number;

  testMessage: string = "ahoj";

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private productMgmtService: ProductMgmtService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.productService.getProduct(this.id)
    .subscribe(
      data => {
        this.editForm = this.formBuilder.group({
          name: data.name,
          description: data.description,
          category: data.category,
          imgUrl: data.imgUrl,
          price: data.price,
        });
      },
      error => console.log(error)
    );
   

  }

  public edit(): void {
    this.productMgmtService.edit(this.id, this.editForm.value).subscribe();
    this.router.navigate(['/admin/products']);
  }

  get f() { return this.editForm.controls; }

}
