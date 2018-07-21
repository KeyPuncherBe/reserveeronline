import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { HoevewinkelAppComponent } from './hoevewinkel-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ProductService } from './services/product.service';
import { httpInterceptorProviders } from '../http-interceptors';

const routes: Routes = [
  {path: '', component: HoevewinkelAppComponent,
  children : [
    {path: '', component: MainContentComponent}
  ]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    httpInterceptorProviders,
    ProductService
  ],
  declarations: [HoevewinkelAppComponent, ToolbarComponent, MainContentComponent, SidenavComponent]
})
export class HoevewinkelModule { }
