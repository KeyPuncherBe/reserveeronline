import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../models/product';

import {isNumeric} from 'rxjs/util/isNumeric';
import { OrderService } from '../../services/order.service';
import { ShoppingCart } from '../../models/shopping-cart';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  private _shoppingCart: Observable<ShoppingCart>;
  products: Observable<Product[]>;
  shoppingCart: ShoppingCart;
  itemSize: number;

  constructor(private _productService: ProductService, private _orderService: OrderService) { }

  ngOnInit() {
    this.products = this._productService.products;
    this._shoppingCart = this._orderService.shoppingCart;
    this._productService.loadAll();
    this._orderService.loadAll();

    this.shoppingCart = new ShoppingCart();
    this.shoppingCart.comment = 'test';

    this._shoppingCart.subscribe( data => {
      console.log('subscribing to shoppingcart: ');
      // this.shoppingCart = data;
      this.shoppingCart.comment = 'na update';
      console.log(data.items);
      this.shoppingCart = data;
      console.log(data);
      console.log(this.shoppingCart);
    });

    this.products.subscribe( data => {
      console.log(data);
    });
  }

  increaseProduct (product: Product) {
    this._orderService.increaseProduct(product).subscribe();
  }

  decreaseProduct (product: Product) {
    this._orderService.decreaseProduct(product).subscribe();
  }

  setProductsInCart(product: Product, aantal: any) {
   this._orderService.modifyShoppingCart(product, aantal).subscribe();
  }

}
