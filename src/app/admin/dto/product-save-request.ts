export class ProductSaveRequest {
    name: string;
    description: string;
    category: string;
    imgUrl: string;
    price: number;

    constructor(name: string, description: string,
        category: string, imgUrl: string, price: number) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.imgUrl = imgUrl;
        this.price = price;
    }
}