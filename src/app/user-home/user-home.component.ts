import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { NavServiceService } from '../_services/nav-service.service';
import { RetailerService } from '../_services/retailer.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  isLoggedIn = false;
  constructor(private tokenStorage: TokenStorageService ,private retailerService:RetailerService,  public nav:NavServiceService ,private router: Router) {
    this.loadScripts();
   }

  products:any;
  content = '';
  ngOnInit(): void {
    this.nav.show();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      }
    if(this.isLoggedIn===false){
      this.router.navigate([""]);
    }
    let list = this.retailerService.viewProductsFromCart();
    list.subscribe((data) => this.products=data);

    // this.userService.getUserBoard().subscribe(
    //   data => {
    //     this.content = data;
    //   },
    //   err => {
    //     this.content = JSON.parse(err.error).message;
    //   }
    // );
  }


  loadScripts() { 
    const node = document.createElement('script'); 
    node.src = 'assets/load.js'; 
    node.type = 'text/javascript'; 
    node.async = false; 
    document.getElementsByTagName('head')[0].appendChild(node); 
  
} 


}
