export class OrderFormItem {
    productId: number;
    name: string;
    quantity: number;
    price: number;

    constructor(productId: number, productName: string, 
                quantity: number, productPrice: number) {
        this.productId = productId;
        this.name = productName;
        this.quantity = quantity;1
        this.price = productPrice;
    }
}