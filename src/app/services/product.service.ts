import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = environment.baseUrl + "/products";
  mgmtUrl = environment.baseUrl + "/api/products";

  constructor(private http: HttpClient) { }

  public getAll(page: number): Observable<Product[]> {
    let params = new HttpParams()
      .append("page", page)
      .append("size", 2);

    return this.http.get<Product[]>(this.url, { params: params });
  }

  public getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }

  public getProductsByCategory(category: string, page: number): Observable<Product> {

    let params = new HttpParams()
    .append("page", page)
    .append("size", 2);

    return this.http.get<Product>(this.url + "/categories/" + category, { params: params });
  }

  public countCategoryProducts(categoryName: string): Observable<number> {
    return this.http.get<number>(this.url + "/count/" + categoryName);
  }

}
