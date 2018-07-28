import { Product } from './product';

export interface IShoppingCart {
    items?: {product: string, amount: number}[];
    comment?: string;
}
