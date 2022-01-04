import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductSaveRequest } from '../dto/product-save-request';

@Injectable({
  providedIn: 'root'
})
export class ProductMgmtService {
  urlCount = environment.baseUrl + "/products/count";
  mgmtUrl = environment.baseUrl + "/api/mgmt/products";

  constructor(private http: HttpClient) { }

  public save(saveRequest: ProductSaveRequest): Observable<any> {
    return this.http.post<any>(this.mgmtUrl, saveRequest);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.mgmtUrl}/${id}`);
  }

  public refreshDate(id: number): Observable<any> {
    return this.http.patch<any>(`${this.mgmtUrl}/${id}`, null);
  }

  public edit(id: number, editRequest: ProductSaveRequest): Observable<any> {
    return this.http.put<any>(`${this.mgmtUrl}/${id}`, editRequest);
  }

  public countAll(): Observable<number> {
    return this.http.get<number>(this.urlCount,
      { responseType: 'text' as 'json' });
  }

}