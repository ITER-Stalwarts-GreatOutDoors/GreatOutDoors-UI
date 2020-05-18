import { Component, OnInit } from '@angular/core';
import { Wishlist } from '../models/wishlist.model';
import { AddToWishlistService } from '../_services/add-to-wishlist.service';
import { NavServiceService } from '../_services/nav-service.service';
import { Router } from '@angular/router';
import { Cart } from '../models/cart.model';
import { AddToCartServiceService } from '../_services/add-to-cart-service.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  private roles: string[];
  isLoggedIn = false;
  wishList:Wishlist;
  products:any;
  cart:Cart;

  constructor(private service:AddToWishlistService , public nav:NavServiceService ,private router: Router , private addToCartService:AddToCartServiceService , private tokenStorageService: TokenStorageService ) { }

  ngOnInit(): void {
    if (!this.isLoggedIn) {
      this.router.navigate(["/auth"]);
    }
    else{
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      if(!this.roles.includes('ROLE_RETAILER')){
        this.router.navigate(["/home"]);
      }
    }
    let list = this.service.viewAllItems();
    list.subscribe((data) => this.products=data);
    this.nav.hide();
  }


  discount = 0


  itemCount() {
    
    return this.products.length;
  }



  removeItem(index) {
    var message;
    this.wishList = new Wishlist();
    this.wishList.userId = "user1";
    this.wishList.productId = this.products[index].productId;
    
    
    let remove = this.service.deleteProduct(this.wishList);
    remove.subscribe((data) => message=data);
    this.products.splice(index, 1);
  
    
  }
  addItemToCart(index){
    var message;
    this.cart = new Cart();
    //to be changed
    this.cart.userId = "user1";
    this.cart.productId = this.products[index].productId;
    this.cart.quantity =1;
    let itemAddedToCart = this.addToCartService.addToCart(this.cart);
    itemAddedToCart.subscribe((data) => message=data);
    this.removeItem(index);
  }

  backToShopping(){
    this.router.navigate(["/retailer"]);
  }


}
