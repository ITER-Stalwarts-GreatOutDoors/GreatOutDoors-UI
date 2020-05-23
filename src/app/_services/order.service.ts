import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderURL:String = "http://localhost:8080/cart-service/";
  constructor(private http:HttpClient) {}


  
  public getAllOrders(userId:string){
    return this.http.get(this.orderURL+"order/getOrders?userId="+userId );
  }

  public getAllProductsOfOrder(orderId:string){
    return this.http.get(this.orderURL+"cart/viewOrderProducts?orderId="+orderId);
  }
 

}
