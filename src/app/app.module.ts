import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AdminMasterComponent } from './admin-master/admin-master.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { AddToCartServiceService } from './add-to-cart-service.service';
import {HttpClientModule } from '@angular/common/http'
import { IndianCurrency } from './cart/indianCurrency.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AdminMasterComponent,
    CartComponent,
    IndianCurrency
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AddToCartServiceService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
