export class CartItem {
    id: number;
    imgUrl: string;
    name: string;
    price: number;
    quantity: number;

    constructor(id: number, imgUrl: string, name: string, price: number, quantity: number) {
        this.id = id;
        this.imgUrl = imgUrl;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}