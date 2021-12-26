export class OrderItem {
    productName: string;
    quantity: number;
    productPrice: number;
    totalPrice: number;

    constructor(productName: string, quantity: number, productPrice: number, totalPrice: number) {
        this.productName = productName;
        this.quantity = quantity;
        this.productPrice = productPrice;
        this.totalPrice = totalPrice;
    }
}