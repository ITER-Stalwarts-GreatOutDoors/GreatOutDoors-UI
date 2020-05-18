import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RetailerService {

  private productURL:String = "http://localhost:9500/product";

  constructor(private http:HttpClient) { }

  public viewAllProducts(){
    return this.http.get(this.productURL+"/viewAllProducts");
  }
}
