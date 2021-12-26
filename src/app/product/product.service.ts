import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = environment.baseUrl + "/products/";

  constructor(private http: HttpClient) { }

  public getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.url + id);
  }

  // public getProducts(ids: number[]): Observable<Product[]> {
  //   let params = new HttpParams()
  //   .append("productsIds", ids.join(','));
  //   return this.http.get<Product[]>(this.url, {params: params});
  // }

  
  public getProductsByCategory(category: string): Observable<Product> {

    let params = new HttpParams()
      .append("page", "0")
      .append("size", "2");
    console.log(category);
    return this.http.get<Product>(this.url + "/categories/" + category, {params: params}); 
  }

}
