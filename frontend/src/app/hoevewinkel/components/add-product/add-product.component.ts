import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  public product: FormGroup;
  public errorMsg: string;

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.product = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      purchaseUnit: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      allowDecimal: [false],
      stackable: [true]
    });
  }

  onSubmit() {
    if (this.product.valid) {
      const newProduct: Product = new Product();
      newProduct.name = this.product.value.name;
      newProduct.description = this.product.value.description;
      newProduct.purchaseUnit = this.product.value.purchaseUnit;
      newProduct.price = this.product.value.price;
      newProduct.allowDecimal = this.product.value.allowDecimal;
      newProduct.stackable = this.product.value.stackable;

      console.log('submitting');
      console.log(newProduct);
      this.productService.addProduct(newProduct).subscribe(val => {
        console.log('inside subscription');
        console.log(val);
          if (val) {
            console.log('going to navigate');
            this.router.navigate(['/hoevewinkel']);
          }
        }, err => {
        this.errorMsg = err.message;
          console.log(this.errorMsg);
        });
    } else {
      console.log('form invalid');
    }

  }

}
