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
    title: '',
    category: '',
    description: '',
    rating: 0,
    price: '',
    originalPrice: ''
  };
  products: any[] = [];
  selectedFile: File | null = null;

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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onAddProduct() {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
    formData.append('title', this.product.title);
    formData.append('category', this.product.category);
    formData.append('description', this.product.description);
    formData.append('rating', this.product.rating.toString());
    formData.append('price', this.product.price);
    formData.append('originalPrice', this.product.originalPrice);

    this.productService.addProduct(formData).subscribe(
      (data: any) => {
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
      (error: any) => {
        console.error('Error adding product:', error);
      }
    );
  }
}
