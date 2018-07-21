import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './authentication.service';

const routes: Routes = [
  {path: '', component: RegisterComponent,
  children : [
    {path: '/register', component: RegisterComponent},
    {path: '/login', component: LoginComponent},
  ]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginComponent, RegisterComponent],
  providers: [
    AuthenticationService
  ]
})
export class UserModule { }
