import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { OrderDetails } from "./order.details";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    url = environment.baseUrl + "/api/orders";

    constructor(private http: HttpClient) { }

    public getAll(): Observable<OrderDetails[]> {
        return this.http.get<OrderDetails[]>(this.url);
    }

    public orderOne(productId: number, quantity: number, paymentType: string): Observable<string> {
        return this.http.post(this.url, {
            body: {
                "productId": productId,
                "quantity": quantity,
                "paymentType": paymentType,
            }
        }, { responseType: 'text' });
    }

    public saveOne(id: number, quantity: number, paymentType: string): Observable<any> {
        return this.http.post<any>(this.url, {body: {
            "productId": id,
            "quantity": quantity,
            "paymentType": paymentType
        }}); //todo: reponseType!!
    }
}