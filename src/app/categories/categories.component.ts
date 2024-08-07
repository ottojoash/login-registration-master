import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.services';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  activeTab: 'add' | 'view' = 'add';
  newCategory = { name: '' }; // Exclude image from initial form data
  categories: { image: string; name: string }[] = [];
  selectedFile: File | null = null;

  constructor(private categoryService: CategoryService, private http: HttpClient) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (data: any[]) => {
        this.categories = data;
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onAddCategory() {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
    formData.append('name', this.newCategory.name); // Ensure this matches the backend field
  
    this.categoryService.createCategory(formData).subscribe(
      (data: any) => {
        this.categories.push(data);
        this.newCategory = { name: '' }; // Reset form
        this.selectedFile = null;
        this.activeTab = 'view'; // Switch to view tab
      },
      (error: any) => {
        console.error('Error adding category:', error);
      }
    );
  }
  
}
