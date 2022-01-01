import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductMgmtService } from '../services/product-mgmt-service';

@Component({
  selector: 'app-product-save',
  templateUrl: './product-save.component.html',
  styleUrls: ['./product-save.component.scss']
})
export class ProductSaveComponent implements OnInit {
  saveForm!: FormGroup;
  submitted!: boolean;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private productMgmtService: ProductMgmtService) { }

  ngOnInit(): void {
    this.saveForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required, Validators.maxLength(255)],
      category: ['', Validators.required],
      imgUrl: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  public save(): void {
    this.submitted = true;
    if (this.saveForm.invalid) {
      return;
    }

    this.productMgmtService.save(this.saveForm.value)
      .subscribe();

    this.router.navigate(['/admin/products']);
  }

  get f() { return this.saveForm.controls; }
}
