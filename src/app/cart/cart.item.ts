export class CartItem {
    id: number; // now it is cart item id, but it should be product id 
    name: string;
    price: number;
    quantity: number;
    totalPrice: number;

    constructor(id: number, name: string,price: number,quantity: number,totalPrice: number) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
    }
}