// src/app/category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/api/shop/categories'; // Ensure this is correct

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createCategory(category: { image: string; name: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, category);
  }
}
