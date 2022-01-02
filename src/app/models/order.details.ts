import { OrderFormItem } from "src/models/order-form-item";

export class OrderDetails {
    paymentId: number;
    items: OrderFormItem[];
    date: Date;
    fullName: string;
    email: string;
    city: string;
    street: string;
    postalCode: string;
    totalPrice: number;

    constructor(paymentId: number, totalPrice: number,
        items: OrderFormItem[], fullName: string,
        email: string, paymentStatus: string,
        city: string, street: string,
        postalCode: string, date: Date) {
        this.paymentId = paymentId;
        this.totalPrice = totalPrice;
        this.items = items;
        this.fullName = fullName;
        this.email = email;
        this.city = city;
        this.street = street;
        this.postalCode = postalCode;
        this.date = date;
    }
}