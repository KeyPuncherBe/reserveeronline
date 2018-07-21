import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthGuardService } from './user/auth-guard.service';
import { AuthenticationService } from './user/authentication.service';




const routes: Routes = [
  {path: 'hoevewinkel',
  canActivate: [ AuthGuardService ],
  loadChildren: './hoevewinkel/hoevewinkel.module#HoevewinkelModule'},
  {path: 'users', loadChildren: './user/user.module#UserModule'},
  {path: 'demo', loadChildren: './demo/demo.module#DemoModule'},
  {path: 'login', redirectTo: 'users', pathMatch: 'full'},
  {path: '', redirectTo: 'hoevewinkel', pathMatch: 'full'},
  {path: '**', redirectTo: 'hoevewinkel'}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {enableTracing: true})
  ],
  providers: [HttpClientModule, AuthGuardService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
