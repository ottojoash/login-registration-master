import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { ImageUploadService } from '../services/image-upload.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  showAddProduct = true;
  product = {
    title: '',
    category: '',
    description: '',
    rating: 0,
    price: '',
    originalPrice: ''
  };
  products: any[] = [];
  selectedFile: File | null = null;

  constructor(
    private productService: ProductService,
    private imageUploadService: ImageUploadService
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onAddProduct() {
    if (this.selectedFile) {
      this.imageUploadService.uploadImage(this.selectedFile).subscribe((url) => {
        const formData = new FormData();
        formData.append('image', url); // Use the image URL returned by the service
        formData.append('title', this.product.title);
        formData.append('category', this.product.category);
        formData.append('description', this.product.description);
        formData.append('rating', this.product.rating.toString());
        formData.append('price', this.product.price);
        formData.append('originalPrice', this.product.originalPrice);

        this.productService.addProduct(formData).subscribe(
          (data) => {
            this.products.push(data);
            this.product = {
              title: '',
              category: '',
              description: '',
              rating: 0,
              price: '',
              originalPrice: ''
            };
            this.selectedFile = null;
            this.showAddProduct = false;
          },
          (error) => {
            console.error('Error adding product:', error);
          }
        );
      });
    }
  }
}
