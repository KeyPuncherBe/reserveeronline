import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../models/product';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  winkelwagen: Map<Product, number>;
  products: Observable<Product[]>;

  constructor(private _productService: ProductService) { }

  ngOnInit() {
    this.winkelwagen = new Map();
    this.products = this._productService.products;
    this._productService.loadAll();

    this.products.subscribe( data => {
      console.log(data);
    });
  }

  addProduct (product: Product) {
    console.log(product);
    this.winkelwagen.set(product, this.winkelwagen.has(product) ? this.winkelwagen.get(product) + 1 : 1);
    console.log(this.winkelwagen);
  }

}
