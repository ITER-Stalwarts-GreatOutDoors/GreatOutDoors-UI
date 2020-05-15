import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { ProductMasterHomeComponent } from './product-master-home/product-master-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { RetailerhomepageComponent } from './retailerhomepage/retailerhomepage.component';


const routes: Routes = [
  {path: 'auth',component: AuthComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserHomeComponent },
  { path: 'master', component: ProductMasterHomeComponent },
  { path: 'admin', component: AdminHomeComponent },
  {path:'retailer' , component: RetailerhomepageComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
