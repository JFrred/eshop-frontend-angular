import { CartItem } from "./cart.item";

export class Cart {
    items: CartItem[];
    totalPrice: number;

    constructor(items: CartItem[], totalPrice: number) {
        this.items = items;
        this.totalPrice = totalPrice;
    }
}