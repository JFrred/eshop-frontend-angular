import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Cart } from "./cart";

@Injectable({
    providedIn: 'root'
})
export class CartService {

    url = environment.baseUrl + "/api/cart";

    constructor(private http: HttpClient) { }

    public get(): Observable<Cart> {
        return this.http.get<Cart>(this.url);
    }

    public addProduct(id: number): Observable<any> {
        // let params = new HttpParams()
        // .append("id", "id")
        // .append("quantity", "1");
        let postUrl = `${this.url}/${id}`;
        console.log("url= " + postUrl);
        return this.http.post(postUrl, {body: null});
    }

    public remove(id: number, quantity: number): Observable<any> {
        let params = new HttpParams()
        .append("id", "id")
        .append("quantity", "quantity");

        console.log("id: " + id);
        console.log("quantity: " + quantity);

        return this.http.delete<any>(this.url, {params: params});
    }

}