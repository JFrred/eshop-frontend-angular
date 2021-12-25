import { CartItem } from "./cart.item";

export class Cart {
    totalPrice: number;
    countItems: number;
    items: CartItem[];

    constructor(totalPrice: number, items: CartItem[]) {
        this.totalPrice = totalPrice;
        this.items = items;
        this.countItems = this.items.length;
    }
}