export class Product {
    id: number;
    name: string;
    imgUrl: string;
    price: number;
    category: string;
    description: string;
    lastModified: string;

    constructor(id: number, name: string, imgUrl: string, price: number,
        category: string, description: string, lastModified: string) {
        this.id = id;
        this.name = name;
        this.imgUrl = imgUrl;
        this.price = price;
        this.category = category;
        this.description = description;
        this.lastModified = lastModified;
    }
}