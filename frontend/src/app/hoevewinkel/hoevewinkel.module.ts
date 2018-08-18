import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HoevewinkelAppComponent } from './hoevewinkel-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { ShoppingCartSidenavComponent } from './components/shopping-cart-sidenav/shopping-cart-sidenav.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ProductService } from './services/product.service';
import { httpInterceptorProviders, basehttpInterceptorProviders } from '../http-interceptors';
import { AddProductComponent } from './components/add-product/add-product.component';
import { RoleGuardService } from '../user/role-guard.service';
import { OrderService } from './services/order.service';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '', component: HoevewinkelAppComponent,
    children: [
      { path: '', component: MainContentComponent },
      { path: 'add-product', canActivate: [RoleGuardService], data: { expectedRole: 'admin' }, component: AddProductComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    basehttpInterceptorProviders,
    httpInterceptorProviders,
    ProductService,
    OrderService
  ],
  declarations: [HoevewinkelAppComponent,
    ToolbarComponent,
    MainContentComponent,
    SidenavComponent,
    AddProductComponent,
    ShoppingCartSidenavComponent,
    ProductDetailComponent]
})
export class HoevewinkelModule { }
