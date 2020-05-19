import { Component, OnInit } from '@angular/core';
import { Wishlist } from '../models/wishlist.model';
import { AddToWishlistService } from '../_services/add-to-wishlist.service';
import { NavServiceService } from '../_services/nav-service.service';
import { Router } from '@angular/router';
import { Cart } from '../models/cart.model';
import { AddToCartServiceService } from '../_services/add-to-cart-service.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { NotificationService } from '../_services/notification.service';

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
  private userId='';

  constructor(private notificationService:NotificationService,private service:AddToWishlistService , public nav:NavServiceService ,private router: Router , private addToCartService:AddToCartServiceService , private tokenStorageService: TokenStorageService ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (!this.isLoggedIn) {
      this.router.navigate(["/auth"]);
    }
    else{
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.userId=user.id;
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
    if(this.itemCount()==1){
      this.notificationService.showWarning("Please add items!!","No item present in the wishlist");
    }
    var message;
    this.wishList = new Wishlist();
    this.wishList.userId = this.userId;
    this.wishList.productId = this.products[index].productId;
    
    
    let remove = this.service.deleteProduct(this.wishList);
    remove.subscribe((data) => message=data);
    this.products.splice(index, 1);
  
    
  }
  addItemToCart(index){
    var message;
    this.cart = new Cart();
 
    this.cart.userId = this.userId;
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
