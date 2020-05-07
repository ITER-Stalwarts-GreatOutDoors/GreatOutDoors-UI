import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminMasterComponent } from './admin-master/admin-master.component';


const routes: Routes = [
  {path: '',component: AuthComponent },
  {path: 'admin',component: AdminMasterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
