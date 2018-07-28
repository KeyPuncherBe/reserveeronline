import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { Routes, RouterModule } from '@angular/router';
import { httpInterceptorProviders } from './http-interceptors/index';

import { AppComponent } from './app.component';
import { AuthGuardService } from './user/auth-guard.service';
import { AuthenticationService } from './user/authentication.service';
import { RoleGuardService } from './user/role-guard.service';
import { ShoppingCartSidenavComponent } from './hoevwinkel/components/shopping-cart-sidenav/shopping-cart-sidenav.component';




const routes: Routes = [
  {path: 'hoevewinkel',
  canActivate: [ AuthGuardService ], loadChildren: './hoevewinkel/hoevewinkel.module#HoevewinkelModule'},
  {path: 'admin', canActivate: [AuthGuardService, RoleGuardService],
  data: {expectedRole: 'admin'},
  loadChildren: './admin/admin.module#AdminModule'},
  {path: 'users', loadChildren: './user/user.module#UserModule'},
  {path: 'demo', loadChildren: './demo/demo.module#DemoModule'},
  {path: 'login', redirectTo: 'users', pathMatch: 'full'},
  {path: '', redirectTo: 'hoevewinkel', pathMatch: 'full'},
  {path: '**', redirectTo: 'hoevewinkel'}
];

@NgModule({
  declarations: [
    AppComponent,
    ShoppingCartSidenavComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [HttpClientModule, AuthGuardService, RoleGuardService, AuthenticationService, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
