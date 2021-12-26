import { OrderItem } from "./order.item";

export class OrderDetails {
    sellerName: string;
    totalPrice: number;
    items: OrderItem[];
    paymentType: string;
    paymentStatus: string;
    date: Date;

    constructor(sellerName: string, totalPrice: number, 
                items: OrderItem[], paymentType: string, 
                paymentStatus: string,  date: Date) {
        this.sellerName = sellerName;
        this.totalPrice =totalPrice;
        this.items = items;
        this.paymentType = paymentType;
        this.paymentStatus = paymentStatus;
        this.date = date;
    }
}