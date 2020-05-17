import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class AddToCartServiceService {


  cartURL:String = "http://localhost:8150/cart";

  constructor(private http:HttpClient) { }



  public viewProductsFromCart(){
    return this.http.get(this.cartURL+"/viewProductsFromCart");
  }

  public removeItemFromCart(productId){
    return this.http.delete(this.cartURL+"/removeFromCartById?userId=user1&productId="+productId);
    //return this.http.post(this.cartURL+"/removeFromCartById",{"userId":"user1","productId":productId},{responseType:'text' as 'json'});
  }
  public addToCart(cart:Cart){
    return this.http.post(this.cartURL+"/addItemToCart",cart,{responseType:'text' as 'json'});
  }




}


