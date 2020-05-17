import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { NavServiceService } from '../_services/nav-service.service';
import { RetailerService } from '../_services/retailer.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { AddToCartServiceService } from '../_services/add-to-cart-service.service';
import { Cart } from '../models/cart.model';
import { AddToWishlistService } from '../_services/add-to-wishlist.service';
import { Wishlist } from '../models/wishlist.model';

@Component({
  selector: 'app-retailerhomepage',
  templateUrl: './retailerhomepage.component.html',
  styleUrls: ['./retailerhomepage.component.css']
})
export class RetailerhomepageComponent implements OnInit {

  isLoggedIn = false;
  content = '';
  products:any;
  cart:Cart;
  wishList:Wishlist
   constructor(private tokenStorage: TokenStorageService ,private retailerService:RetailerService,  
    public nav:NavServiceService ,private router: Router , private addToCartService:AddToCartServiceService , private wishListService:AddToWishlistService) { 
     this.loadScripts(); 
   } 

  ngOnInit(){
    this.nav.show();
    let list = this.retailerService.viewProductsFromCart();
    list.subscribe((data) => this.products=data);

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      }
    if(this.isLoggedIn===false){
        this.router.navigate([""]);
    }
    // this.userService.getRetailerBoard().subscribe(
    //   data => {
    //     this.content = data;
    //   },
    //   err => {
    //     this.content = JSON.parse(err.error).message;
    //   }
    // );
  }

  addProductToCart(index){
    var message;
    this.cart = new Cart();
    //to be changed
    this.cart.userId = "user1";
    this.cart.productId = this.products[index].productId;
    this.cart.quantity =1;
    let itemAddedToCart = this.addToCartService.addToCart(this.cart);
    itemAddedToCart.subscribe((data) => message=data);
    
    
  }

  addProductToWishList(index){
 
    var message;
    this.wishList = new Wishlist();
    this.wishList.productId=this.products[index].productId;
    //to be changed
    this.wishList.userId = "user1";
    let itemAddedToWishList = this.wishListService.addToWishList(this.wishList);
    itemAddedToWishList.subscribe((data) => message=data);

  }
  
   // Method to dynamically load JavaScript 
   loadScripts() { 
       const node = document.createElement('script'); 
       node.src = 'assets/load.js'; 
       node.type = 'text/javascript'; 
       node.async = false; 
       document.getElementsByTagName('head')[0].appendChild(node); 
     
  } 

}
