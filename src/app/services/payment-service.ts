import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PaymentDetails } from "../models/payment-details";

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    url = environment.baseUrl + "/api/payments";

    constructor(private http: HttpClient) {}

    public get(id: number): Observable<PaymentDetails> {
        return this.http.get<PaymentDetails>(`${this.url}/${id}`);
    }
}