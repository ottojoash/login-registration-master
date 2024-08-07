import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://backendshop-9nf6.onrender.com/api/shop/products/';  // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }
}
