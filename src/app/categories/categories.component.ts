// src/app/categories/categories.component.ts
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  activeTab: 'add' | 'view' = 'add';
  newCategory = { image: '', name: '' };
  categories: { image: string; name: string }[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  
onAddCategory() {
  if (this.newCategory.image && this.newCategory.name) {
    this.categoryService.createCategory(this.newCategory).subscribe(
      (data) => {
        this.categories.push(data);
        this.newCategory = { image: '', name: '' }; // Reset form
        this.activeTab = 'view'; // Switch to view tab
      },
      (error) => {
        console.error('Error adding category:', error);
      }
    );
  }
}
}
