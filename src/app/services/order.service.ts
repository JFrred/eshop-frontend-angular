import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { OrderRequest } from "src/models/order-request";
import { OrderBillingAddress } from "../models/order-billing-address";
import { OrderDetails } from "../models/order.details";
import { OrderItem } from "src/models/order-item";
import { CartItem } from "src/models/cart.item";

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
        return this.http.post<any>(this.url, {
            body: {
                "productId": id,
                "quantity": quantity,
                "paymentType": paymentType
            }
        });
    }

    public save(items: CartItem[], billingAddress: OrderBillingAddress): Observable<any> {
        console.log(items);
        let orderItems: OrderItem[] = [];
        let orderItem;

        for (let item of items) {
            console.log(item.id + " - " + item.quantity);
            orderItem = new OrderItem(item.id, item.quantity);
            console.log("orderItem : " + orderItem);
            orderItems.push(orderItem);
        }

        console.log("order items : " + orderItems);

        let paymentType = "TRANSFER";
        let orderRequest = new OrderRequest(orderItems, paymentType);

        return this.http.post<any>(this.url,
            orderRequest,
            { responseType: 'text' as 'json' }
        );
    }
}