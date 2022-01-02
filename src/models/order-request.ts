import { OrderItem } from "./order-item";

export class OrderRequest {
    items: OrderItem[];
    fullName: string;
    email: string;
    city: string;
    street: string;
    postalCode: string;

    paymentType: string;

    constructor(items: OrderItem[], fullName: string,
        email: string, city: string,
        street: string, postalCode: string,
        paymentType: string) {
        this.items = items;
        this.fullName = fullName;
        this.email = email;
        this.city = city;
        this.street = street;
        this.postalCode = postalCode;
        this.paymentType = paymentType;
    }
}