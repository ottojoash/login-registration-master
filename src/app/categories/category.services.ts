import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'https://backendshop-9nf6.onrender.com/api/categories/categories/';

  constructor(private http: HttpClient) {}

  // Accept FormData as parameter
  createCategory(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, formData);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  updateCategory(categoryId: string, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${categoryId}`, formData);
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${categoryId}`);
  }
}
