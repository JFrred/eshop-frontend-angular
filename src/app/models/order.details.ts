import { OrderFormItem } from "src/models/order-form-item";

export class OrderDetails {
    paymentId: number;
    sellerName: string;
    totalPrice: number;
    items: OrderFormItem[];
    paymentType: string;
    paymentStatus: string;
    date: Date;

    constructor(paymentId: number, sellerName: string, totalPrice: number,
        items: OrderFormItem[], paymentType: string,
        paymentStatus: string, date: Date) {
        this.paymentId = paymentId;
        this.sellerName = sellerName;
        this.totalPrice = totalPrice;
        this.items = items;
        this.paymentType = paymentType;
        this.paymentStatus = paymentStatus;
        this.date = date;
    }
}