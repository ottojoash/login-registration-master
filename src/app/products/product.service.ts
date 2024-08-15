import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/shop/products';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  addProduct(productData: FormData) {
    return this.http.post<any>(`${this.apiUrl}`, productData);
  }

  updateProduct(productId: string, productData: FormData) {
    return this.http.put<any>(`${this.apiUrl}/${productId}`, productData);
  }

  deleteProduct(productId: string) {
    return this.http.delete(`${this.apiUrl}/${productId}`);
  }
}
