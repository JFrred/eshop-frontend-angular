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

  public getAll(): Observable<Product[]> {
    let params = new HttpParams()
      .append("page", "0")
      .append("size", "10");

    return this.http.get<Product[]>(this.url, { params: params });
  }

  public getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }

  public getProductsByCategory(category: string): Observable<Product> {

    let params = new HttpParams()
      .append("page", "0")
      .append("size", "2");
    console.log(category);
    return this.http.get<Product>(this.url + "/categories/" + category, { params: params });
  }

}
