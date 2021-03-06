import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { AddToCartServiceService } from './_services/add-to-cart-service.service';
import {HttpClientModule } from '@angular/common/http'
import { IndianCurrency } from './cart/indianCurrency.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatGridListModule} from '@angular/material/grid-list';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { RetailerhomepageComponent } from './retailerhomepage/retailerhomepage.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ProductMasterHomeComponent } from './product-master-home/product-master-home.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { UserHomeComponent } from './user-home/user-home.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { RetailerProfileComponent } from './retailerhomepage/retailer-profile/retailer-profile.component';
import { RetailerEditProfileComponent } from './retailerhomepage/retailer-edit-profile/retailer-edit-profile.component';
import { AddproductComponent } from './product-master-home/addproduct/addproduct.component';
import { ViewproductComponent } from './product-master-home/viewproduct/viewproduct.component';
import { ToastrModule } from 'ngx-toastr';
import { AddretailerComponent } from './admin-home/addretailer/addretailer.component';
import { AddproductmasterComponent } from './admin-home/addproductmaster/addproductmaster.component';
import { ViewproductmasterComponent } from './admin-home/viewproductmaster/viewproductmaster.component';
import { ViewretailerComponent } from './admin-home/viewretailer/viewretailer.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { OrderpageComponent } from './orderpage/orderpage.component';
import { OrderdetailComponent } from './orderdetail/orderdetail.component';
import { AddressComponent } from './address/address.component';
import { ViewaddressComponent } from './viewaddress/viewaddress.component';
import { CancelorderComponent } from './cancelorder/cancelorder.component';




@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CartComponent,
    IndianCurrency,
    NavBarComponent,
    HomeComponent,
    RetailerhomepageComponent,
    AdminHomeComponent,
    ProductMasterHomeComponent,
    UserHomeComponent,
    WishlistComponent,
    RetailerProfileComponent,
    RetailerEditProfileComponent,
    AddproductComponent,
    ViewproductComponent,
    AddretailerComponent,
    AddproductmasterComponent,
    ViewproductmasterComponent,
    ViewretailerComponent,
    PlaceOrderComponent,
    OrderpageComponent,
    OrderdetailComponent,
    AddressComponent,
    ViewaddressComponent,
    CancelorderComponent
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [AddToCartServiceService , authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
