import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../hoevewinkel/services/order.service';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../../../hoevewinkel/models/shopping-cart';

@Component({
  selector: 'app-shopping-cart-sidenav',
  templateUrl: './shopping-cart-sidenav.component.html',
  styleUrls: ['./shopping-cart-sidenav.component.scss']
})
export class ShoppingCartSidenavComponent implements OnInit {

  shoppingCart: Observable<ShoppingCart>;

  constructor(private _orderService: OrderService) { }

  ngOnInit() {
    this.shoppingCart = this._orderService.shoppingCart;
    this._orderService.loadAll();
    this.shoppingCart.subscribe( data => console.log(data));
  }

}
