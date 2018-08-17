import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../hoevewinkel/services/order.service';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../../../hoevewinkel/models/shopping-cart';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-shopping-cart-sidenav',
  templateUrl: './shopping-cart-sidenav.component.html',
  styleUrls: ['./shopping-cart-sidenav.component.scss']
})
export class ShoppingCartSidenavComponent implements OnInit {

  shoppingCart: Observable<ShoppingCart>;

  constructor(private _orderService: OrderService, private _productService: ProductService) { }

  ngOnInit() {
    this.shoppingCart = this._orderService.shoppingCart;
    this._orderService.loadAll();
    this.shoppingCart.subscribe( data => console.log(data));
  }

  getFullProduct(product_id: string): Product {
    return this._productService.getProductFromId(product_id);
  }

  removeProduct(product_id: string) {
    const product: Product = this._productService.getProductFromId(product_id);
    this._orderService.modifyShoppingCart(product, 0).subscribe();
  }

}
