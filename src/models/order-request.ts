import { OrderItem } from "./order-item";

export class OrderRequest {
    items: OrderItem[];
    paymentType: string;

    constructor(items: OrderItem[], paymentType: string) {
        this.items = items;
        this.paymentType = paymentType;
    }
}