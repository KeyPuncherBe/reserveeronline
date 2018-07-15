import { PurchaseUnit } from "./purchase-unit";

export class Product {
    id: number;
    name: string;
    image?: any;
    description: string;
    purchaseUnits: PurchaseUnit[] = [];
}
