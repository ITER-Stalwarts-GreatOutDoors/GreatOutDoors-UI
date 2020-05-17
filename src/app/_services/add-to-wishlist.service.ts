import { Injectable } from '@angular/core';
import { Wishlist } from '../models/wishlist.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddToWishlistService {

  wishlistURL:String = "http://localhost:8050/wishlist";

  constructor(private http:HttpClient) { }

  
   
  public viewAllItems(){
    return this.http.get(this.wishlistURL+"/viewAllProducts");
  }

  public deleteProduct(wishlist:Wishlist){
    // return this.http.delete(this.wishlistURL+"/deleteProduct?userId=user1&productId="+productId);
    return this.http.post(this.wishlistURL+"/deleteProduct",wishlist,{responseType:'text' as 'json'});
  }

  public addToWishList(wishlist:Wishlist){
    return this.http.post(this.wishlistURL+"/addToWishlist",wishlist,{responseType:'text' as 'json'});
  }

}
