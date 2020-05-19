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
import { NotificationService } from '../_services/notification.service';

@Component({
  selector: 'app-retailerhomepage',
  templateUrl: './retailerhomepage.component.html',
  styleUrls: ['./retailerhomepage.component.css']
})
export class RetailerhomepageComponent implements OnInit {

  private roles: string[];
  isLoggedIn = false;
  content = '';
  products:any;
  cart:Cart;
  wishList:Wishlist
  private userId ='';
   constructor(private notificationService:NotificationService, private retailerService:RetailerService,  
    public nav:NavServiceService ,private router: Router , private addToCartService:AddToCartServiceService , private wishListService:AddToWishlistService , private tokenStorageService: TokenStorageService) { 
     this.loadScripts(); 
   } 

  ngOnInit(){
    this.nav.show();
    let list = this.retailerService.viewAllProducts();
    list.subscribe((data) => this.products=data);

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (!this.isLoggedIn) {
      this.router.navigate(["/home"]);
    }
    else{
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.userId=user.id;
      if(!this.roles.includes('ROLE_RETAILER')){
        this.router.navigate([""]);
      }
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
    this.cart.userId = this.userId;
    this.cart.productId = this.products[index].productId;
    this.cart.quantity =1;
    let itemAddedToCart = this.addToCartService.addToCart(this.cart);
    itemAddedToCart.subscribe(
      data =>{ 
        message=data
        this.notificationService.showSuccess("Successfully!!","Item added to cart");
      },
      err =>{
        this.notificationService.showError("Please try again!!","Fail to add item");
      }
      
      );
    
    
  }

  addProductToWishList(index){
    
    var message;
    this.wishList = new Wishlist();
    this.wishList.productId=this.products[index].productId;
    //to be changed
    this.wishList.userId = this.userId;
    let itemAddedToWishList = this.wishListService.addToWishList(this.wishList);
    itemAddedToWishList.subscribe(
      data =>{ 
        this.notificationService.showSuccess("Successfully!!","Item added to wishlist");
        message=data
      }
      
      );

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
