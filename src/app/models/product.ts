import { Size } from "./size";

export interface Product {
    id: number;
    name: string;
    imgUrl: string;
    price: number;
    category: string;
    description: string;
    color: string;
    sizes: Size[];
}