import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ShoppingCart } from '../models/shopping-cart';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Product } from '../models/product';
import { IShoppingCart } from '../models/ishopping-cart';
import { map } from 'rxjs/operators';

@Injectable()
export class OrderService {
  private _appUrl = '/API';
  private _shoppingCart: BehaviorSubject<ShoppingCart>;
  private _dataStore: {
    shoppingCart: ShoppingCart
  };

  constructor(private _http: HttpClient) {
    this._dataStore = { shoppingCart: new ShoppingCart() };
    this._shoppingCart = new BehaviorSubject<ShoppingCart>(new ShoppingCart());
  }

  get shoppingCart(): Observable<ShoppingCart> {
    return this._shoppingCart.asObservable();
  }

  increaseProduct(product: Product) {
    console.log('increasing product');
    const newShoppingCart = this.cloneShoppingCart();
    const toPost: IShoppingCart = newShoppingCart.increaseProduct(product);
    console.log('posting: ');
    console.log(toPost);
    return this.postShoppingCart(toPost);
  }

  decreaseProduct(product: Product) {
    const newShoppingCart = this.cloneShoppingCart();
    const toPost: IShoppingCart = newShoppingCart.decreaseProduct(product);
    this.postShoppingCart(toPost).pipe(
      map((res: IShoppingCart) => {
        console.log(res);
        if (res) {
          this._dataStore.shoppingCart = new ShoppingCart(res);
          this._shoppingCart.next(this.cloneShoppingCart());
        }
      })
    );
  }

  private postShoppingCart(shoppingCart: IShoppingCart) {
    console.log(`inside post to: ${this._appUrl}/shoppingCart`);
    return this._http.post<IShoppingCart>(`${this._appUrl}/shoppingCart`, shoppingCart).pipe(
      map((res: IShoppingCart) => {
        console.log(res);
        if (res) {
          this._dataStore.shoppingCart = new ShoppingCart(res);
          this._shoppingCart.next(this.cloneShoppingCart());
          return res;
        }
      })
    );
  }

  modifyShoppingCart(product: Product, amount: number) {
    const newShoppingCart: ShoppingCart = this.cloneShoppingCart();
    newShoppingCart.modify(product, amount);
  }

  private cloneShoppingCart(): ShoppingCart {
    return Object.assign({}, this._dataStore).shoppingCart;
  }

  loadAll() {
    return this._http.get<IShoppingCart>(`${this._appUrl}/shoppingCart`).subscribe(data => {
      this._dataStore.shoppingCart = new ShoppingCart(data);
      this._shoppingCart.next(Object.assign({}, this._dataStore).shoppingCart);
    }, error => {
      console.log('Failed to fetch the shopping cart.');
      console.log(error);
    });
  }

}
