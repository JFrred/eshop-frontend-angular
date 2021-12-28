import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CartItem } from "src/models/cart.item";
import { OrderFormItem } from "src/models/order-form-item"; 
import { Cart } from "../../models/cart";

@Injectable({
    providedIn: 'root'
})
export class CartService {


    url = environment.baseUrl + "/api/cart";

    constructor(private http: HttpClient) { }

    public get(): Observable<Cart> {
        return this.http.get<Cart>(this.url);
    }

    getItem(id: number): Observable<CartItem> {
        return this.http.get<CartItem>(`${this.url}/${id}`);
    }

    public add(id: number): Observable<any> {
        return this.http.post(`${this.url}/${id}`, { body: null });
    }


    public remove(id: number, quantity: number): Observable<any> {
        return this.http.delete<any>(`${this.url}/${id}`);
    }

}