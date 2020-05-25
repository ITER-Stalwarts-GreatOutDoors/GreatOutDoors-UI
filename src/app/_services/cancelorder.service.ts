import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CancelorderService {

  cancelOrderURL:String = "http://localhost:9090/cancel";
  constructor(private http:HttpClient) { }

  public getAllCancelProducts(){
    return this.http.get(this.cancelOrderURL+"/getCancelProducts");
  }

  public cancelOrder(orderId:string , userId:string){
    let body = new HttpParams();
    body = body.set('orderId' , orderId);
    body = body.set('userId', userId);

    return this.http.post(this.cancelOrderURL+"/cancelOrder",body,{responseType:'text' as 'json'});
  }

  public cancelProduct(orderId:string , userId:string , productId:string){
    let body = new HttpParams();
    body = body.set('orderId' , orderId);
    body = body.set('userId', userId);
    body = body.set('productId', productId);
    

    return this.http.post(this.cancelOrderURL+"/cancelProduct",body,{responseType:'text' as 'json'});
  }

}
