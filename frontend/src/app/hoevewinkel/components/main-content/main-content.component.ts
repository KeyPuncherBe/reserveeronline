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

  constructor(private _productService: ProductService, private _orderService: OrderService) { }

  ngOnInit() {
    this.products = this._productService.products;
    this._shoppingCart = this._orderService.shoppingCart;
    this._productService.loadAll();
    this._orderService.loadAll();

    this.products.subscribe( data => {
      console.log(data);
    });

    this._shoppingCart.subscribe( data => {
      this.shoppingCart = data;
    });
  }

  increaseProduct (product: Product) {
    this._orderService.increaseProduct(product).subscribe();
  }

  setProductsInCart(product: Product, aantal: any) {
    console.log(product);
    console.log(aantal);
    console.log(isNumeric(aantal));
  }

}
