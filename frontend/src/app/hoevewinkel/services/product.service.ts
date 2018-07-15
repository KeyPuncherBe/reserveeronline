import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { PurchaseUnit } from '../models/purchase-unit';

@Injectable()
export class ProductService {
    
  private dataStore: {
    products: Product[];
  }
  constructor(private http: HttpClient) { 
    this.dataStore = {products: []};
    this.addMockProducts();
  }

  addMockProducts() {
    let unit1: PurchaseUnit = {name: "stuk", price: 0.8, allowDecimal: false, stackable: true};
    let unit4: PurchaseUnit = {name: "stuk", price: 2.8, allowDecimal: false, stackable: true};
    let unit2: PurchaseUnit = {name: "gram", price: 14, allowDecimal: false, stackable: false};
    let unit3: PurchaseUnit = {name: "liter", price: 0.7, allowDecimal: true, stackable: true};

    this.dataStore.products.push({id:1, name: "Yoghurt fruit", description: "Yoghurt met fruit", purchaseUnits: [unit1]});
    this.dataStore.products.push({id:2, name: "Brood", description: "Een wit brood", purchaseUnits: [unit4]});
    this.dataStore.products.push({id:3, name: "Melk", description: "Rauwe melk", purchaseUnits: [unit3]});

  }

}
