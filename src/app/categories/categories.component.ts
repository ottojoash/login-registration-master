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
  newCategory = { name: '', _id: '' }; // Include _id for editing
  categories: { _id: string; image: string; name: string }[] = [];
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

    if (this.newCategory._id) {
      // Update category
      this.categoryService.updateCategory(this.newCategory._id, formData).subscribe(
        (data: any) => {
          this.getCategories(); // Refresh category list
          this.newCategory = { name: '', _id: '' }; // Reset form
          this.selectedFile = null;
          this.activeTab = 'view'; // Switch to view tab
        },
        (error: any) => {
          console.error('Error updating category:', error);
        }
      );
    } else {
      // Create new category
      this.categoryService.createCategory(formData).subscribe(
        (data: any) => {
          this.categories.push(data);
          this.newCategory = { name: '', _id: '' }; // Reset form
          this.selectedFile = null;
          this.activeTab = 'view'; // Switch to view tab
        },
        (error: any) => {
          console.error('Error adding category:', error);
        }
      );
    }
  }

  onEditCategory(category: any) {
    this.activeTab = 'add'; // Switch to the add tab to edit
    this.newCategory = { name: category.name, _id: category._id }; // Populate form with category details
    this.selectedFile = null; // Clear selected file
  }

  onDeleteCategory(categoryId: string) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(categoryId).subscribe(
        () => {
          this.getCategories(); // Refresh category list
        },
        (error: any) => {
          console.error('Error deleting category:', error);
        }
      );
    }
  }
}
