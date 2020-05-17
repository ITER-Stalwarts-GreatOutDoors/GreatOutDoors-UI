import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RetailerService {

  productURL:String = "http://localhost:9500/product";

  constructor(private http:HttpClient) { }

  public viewProductsFromCart(){
    return this.http.get(this.productURL+"/viewAllProducts");
  }
}
