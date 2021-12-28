import { OrderFormItem } from "src/models/order-form-item";

export class OrderDetails {
    sellerName: string;
    totalPrice: number;
    items: OrderFormItem[];
    paymentType: string;
    paymentStatus: string;
    date: Date;

    constructor(sellerName: string, totalPrice: number, 
                items: OrderFormItem[], paymentType: string, 
                paymentStatus: string,  date: Date) {
        this.sellerName = sellerName;
        this.totalPrice =totalPrice;
        this.items = items;
        this.paymentType = paymentType;
        this.paymentStatus = paymentStatus;
        this.date = date;
    }
}