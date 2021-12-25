import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Category } from '../models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Input() category: Category | undefined;
  imageUrl :string = "";

  constructor() { }

  ngOnInit(): void {
   this.imageUrl = this.category?.imgUrl ?? '';
  }

}
