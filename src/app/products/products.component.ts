import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  showAddProduct = true;
  product = {
    _id: '', // Add an _id field for editing
    title: '',
    category: '',
    description: '',
    rating: 0,
    price: '',
    originalPrice: '',
    images: [] as string[] // For storing image URLs
  };
  products: any[] = [];
  selectedFiles: File[] = [];
  imagePreviews: string[] = []; // Array to hold image preview URLs

  constructor(private productService: ProductService, private http: HttpClient) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (data: any[]) => {
        this.products = data;
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  onFilesSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
    this.imagePreviews = []; // Reset image previews

    for (const file of this.selectedFiles) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  onAddProduct() {
    const formData = new FormData();
    this.selectedFiles.forEach(file => {
      formData.append('images', file, file.name);
    });
    formData.append('title', this.product.title);
    formData.append('category', this.product.category);
    formData.append('description', this.product.description);
    formData.append('rating', this.product.rating.toString());
    formData.append('price', this.product.price);
    formData.append('originalPrice', this.product.originalPrice);

    if (this.product._id) {
      // Update product
      this.productService.updateProduct(this.product._id, formData).subscribe(
        (data: any) => {
          const index = this.products.findIndex(p => p._id === this.product._id);
          this.products[index] = data;
          this.resetForm();
          this.showAddProduct = false;
        },
        (error: any) => {
          console.error('Error updating product:', error);
        }
      );
    } else {
      // Add new product
      this.productService.addProduct(formData).subscribe(
        (data: any) => {
          this.products.push(data);
          this.resetForm();
          this.showAddProduct = false;
        },
        (error: any) => {
          console.error('Error adding product:', error);
        }
      );
    }
  }

  onEditProduct(product: any) {
    this.product = { ...product }; // Populate the form with the product details
    this.imagePreviews = product.images || []; // Set image previews for editing
    this.showAddProduct = true;
  }

  onDeleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe(
      () => {
        this.products = this.products.filter(p => p._id !== productId);
      },
      (error: any) => {
        console.error('Error deleting product:', error);
      }
    );
  }

  resetForm() {
    this.product = {
      _id: '',
      title: '',
      category: '',
      description: '',
      rating: 0,
      price: '',
      originalPrice: '',
      images: []
    };
    this.selectedFiles = [];
    this.imagePreviews = []; // Reset image previews
  }
}
