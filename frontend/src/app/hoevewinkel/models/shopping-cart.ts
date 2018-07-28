import { Product } from './product';
import { IShoppingCart } from './ishopping-cart';

export class ShoppingCart {
    items?: Map<string, number>; // Key: ProductID, Value: Amount
    comment?: string;

    constructor(shoppingCart?: IShoppingCart) {
        if (!shoppingCart) {
            this.items = new Map();
            return;
        } else {
            this.comment = shoppingCart.comment;
            console.log('loging this');
            console.log(this);
            this.items = new Map();
            if (shoppingCart.items) {
                shoppingCart.items.forEach( item => {
                    this.items.set(item.product, item.amount);
                });
            }
        }
    }

    modify(product: Product, amount: number): IShoppingCart {
        if (amount <= 0) {
            this.items.delete(product._id);
        } else {
            this.items.set(product._id, amount);
        }
        return this.ishoppingCart;
    }

    increaseProduct(product: Product): IShoppingCart {
        if (!this.items.has(product._id)) {
            console.log('Adding product first time in cart');
            this.items.set(product._id, 1);
        } else {
            let amount = this.items.get(product._id);
            amount++;
            this.items.set(product._id, amount);
        }
        return this.ishoppingCart;
    }

    decreaseProduct(product: Product): IShoppingCart {
        if (!this.items.has(product._id)) {
            return this.ishoppingCart;
        } else {
            let amount = this.items.get(product._id);
            amount--;
            if (amount <= 0) {
                this.items.delete(product._id);
            } else {
                this.items.set(product._id, amount);
            }
        }
        return this.ishoppingCart;

    }

    get ishoppingCart(): IShoppingCart {
        const itemArray: { product: string, amount: number }[] = ([]);
        this.items.forEach((value, key) => itemArray.push({ product: key, amount: value }));
        return {
            items: itemArray,
            comment: this.comment
        };
    }

}
