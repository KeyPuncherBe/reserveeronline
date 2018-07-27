import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { PurchaseUnit } from '../models/purchase-unit';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductService {

  private readonly _appUrl = '/API/products';

  private _products: BehaviorSubject<Product[]>;

  private _dataStore: {
    products: Product[];
  };
  constructor(private _http: HttpClient) {
    this._dataStore = {products: []};
    this._products = new BehaviorSubject<Product[]>([]);
  }

  get products(): Observable<Product[]> {
    return this._products.asObservable();
  }

  addProduct(product: Product): Observable<Product> {
    return this._http.post(`/API/products`, product).pipe(
      map((res: Product) => {
        console.log('inside map');
        console.log(res);
        if (res._id) {
          this._dataStore.products.push(res);
          this._products.next(Object.assign({}, this._dataStore).products);
          return res;
        }
      })
    );
  }

  loadAll() {

    return this._http.get<Product[]>(this._appUrl).subscribe( data => {
      this._dataStore.products = data;
      this._products.next(Object.assign({}, this._dataStore).products);
    }, error => {
      console.log('Failed to fetch the products.');
    });
  }


}
