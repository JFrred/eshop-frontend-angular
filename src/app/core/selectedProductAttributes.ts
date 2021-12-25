import { Flavor } from "./flavor";
import { Size } from "../models/size";

export interface SelectedProductAttributes {
    flavor: Flavor | undefined;
    size: Size | undefined;
}