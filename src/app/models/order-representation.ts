import { OrderDetails } from "./order.details";

export class OrderRepresenatation{ 
    orders: OrderDetails[];

    constructor(orders: OrderDetails[]){
        this.orders = orders;
    }
}