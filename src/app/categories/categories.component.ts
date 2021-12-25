import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoryService } from '../category/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories!: Category[];

  constructor(private categorySerivce: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categorySerivce.getAll().subscribe(
    (response: any) => {
        this.categories = response;
        console.log(response);
      }
    )
  }
}
