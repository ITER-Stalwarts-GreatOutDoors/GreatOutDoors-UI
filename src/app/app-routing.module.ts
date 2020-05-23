import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { ProductMasterHomeComponent } from './product-master-home/product-master-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { RetailerhomepageComponent } from './retailerhomepage/retailerhomepage.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AddproductComponent } from './product-master-home/addproduct/addproduct.component';
import { ViewproductComponent } from './product-master-home/viewproduct/viewproduct.component';
import { RetailerProfileComponent } from './retailerhomepage/retailer-profile/retailer-profile.component';
import { RetailerEditProfileComponent } from './retailerhomepage/retailer-edit-profile/retailer-edit-profile.component';
import { AddretailerComponent } from './admin-home/addretailer/addretailer.component';
import { AddproductmasterComponent } from './admin-home/addproductmaster/addproductmaster.component';
import { ViewproductmasterComponent } from './admin-home/viewproductmaster/viewproductmaster.component';
import { ViewretailerComponent } from './admin-home/viewretailer/viewretailer.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { OrderpageComponent } from './orderpage/orderpage.component';
import { OrderdetailComponent } from './orderdetail/orderdetail.component';
import { ViewaddressComponent } from './viewaddress/viewaddress.component';
import { AddressComponent } from './address/address.component';



const routes: Routes = [
  {path: 'auth',component: AuthComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserHomeComponent },
  { path: 'master', component: ProductMasterHomeComponent },
  { path: 'admin', component: AdminHomeComponent},
  {path:'retailer' , component: RetailerhomepageComponent},
  {path:'cart' , component: CartComponent},
  {path:'wishlist' , component: WishlistComponent},
  {path:'master/addproduct' , component: AddproductComponent},
  {path:'master/viewproduct' , component: ViewproductComponent},
  {path:'retailer/profile' , component: RetailerProfileComponent},
  {path:'retailer/edit' , component: RetailerEditProfileComponent},
  {path:'admin/addretailer' , component: AddretailerComponent},
  {path:'admin/addproductmaster' , component: AddproductmasterComponent},
  {path:'admin/viewretailers' , component: ViewretailerComponent},
  {path:'admin/viewproductmaster' , component: ViewproductmasterComponent},
  {path:'placeorder' , component : PlaceOrderComponent},
  {path:'order' , component: OrderpageComponent},
  {path:'orderdetail' , component: OrderdetailComponent},
  {path: 'viewaddress',component: ViewaddressComponent },
  {path: 'address',component: AddressComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
