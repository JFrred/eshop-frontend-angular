import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/models/product';
import { ProductSaveRequest } from '../dto/product-save-request'; 

@Injectable({
  providedIn: 'root'
})
export class ProductMgmtService {
 
    url = environment.baseUrl + "/products";
    mgmtUrl = environment.baseUrl + "/api/products";

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Product[]> {
    let params = new HttpParams()
      .append("page", "0")
      .append("size", "10");

    return this.http.get<Product[]>(this.url, { params: params });
  }

  public save(saveRequest: ProductSaveRequest): Observable<any> {
    return this.http.post<any>(this.mgmtUrl, saveRequest);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.mgmtUrl}/${id}`);
  }

  public refreshDate(id: number): Observable<any> {
    return this.http.patch<any>(`${this.mgmtUrl}/${id}`, null);
  }
}