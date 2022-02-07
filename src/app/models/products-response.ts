import { Product } from "./product";

export class ProductsResponse {
    products: Product[];
    size: number;

    constructor(products: Product[], size: number) {
        this.products = products;
        this.size = size;
    }

}