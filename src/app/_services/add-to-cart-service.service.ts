import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class AddToCartServiceService {


  cartURL:String = "http://localhost:8080/cart-service/cart";

  constructor(private http:HttpClient) { }



  public viewProductsFromCart(){
    return this.http.get(this.cartURL+"/viewProductsFromCart");
  }

  public removeItemFromCart(productId,userId){
    return this.http.delete(this.cartURL+"/removeFromCartById?userId="+userId+"&productId="+productId);
    //return this.http.post(this.cartURL+"/removeFromCartById",{"userId":"user1","productId":productId},{responseType:'text' as 'json'});
  }
  public addToCart(cart:Cart){
    return this.http.post(this.cartURL+"/addItemToCart",cart,{responseType:'text' as 'json'});
  }

  public placeOrder(userId:string,addressId:string,totalCost:number){
    let body = new HttpParams();
    body = body.set('userId', userId);
    body = body.set('addressId', addressId);
    body = body.set('totalCost', ""+totalCost);
    return this.http.post(this.cartURL+"/placeOrder",body,{responseType:'text' as 'json'});
  }




}


