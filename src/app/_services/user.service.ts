import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';

const API_URL = 'http://localhost:9001/app/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})


export class UserService {
 

  
  constructor(private http: HttpClient) { }

  // getPublicContent(): Observable<any> {
  //   return this.http.get(API_URL + 'route/all', { responseType: 'text' });
  // }

  // getUserBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'route/user', { responseType: 'text' });
  // }

  // getProductMasterBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'route/master', { responseType: 'text' });
  // }

  // getAdminBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'route/admin', { responseType: 'text' });
  // }

  // getRetailerBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'route/retailer', { responseType: 'text' });
  // }


  //PRODUCT MASTER ROLES

  addProduct(product:Product): Observable<any> {
    return this.http.post(API_URL + 'master/addProduct',product, { responseType: 'text' });
  }

  deleteProduct(productId:String): Observable<any> {
    return this.http.delete(API_URL + 'master/deleteProduct?productId='+productId,{ responseType: 'text' });
  }

  



  //ADMIN ROLES

  addProductMaster(user:User): Observable<any> {
    return this.http.post(API_URL + 'admin/addProductMaster',user, { responseType: 'text' });
  }

  deleteProductMaster(userId:Number): Observable<any> {
    return this.http.delete(API_URL + 'admin/deleteProductMaster?userId='+userId,{ responseType: 'text' });
  }

  viewAllProductMasters(): Observable<any>{
    return this.http.get(API_URL+'admin/viewAllProductMasters',httpOptions);
  }





  addRetailer(user:User): Observable<any> {
    return this.http.post(API_URL + 'admin/addRetailer',user,{ responseType: 'text' });
  }

  deleteRetailer(userId:Number): Observable<any> {
    return this.http.delete(API_URL + 'admin/deleteRetailer?userId='+userId, { responseType: 'text' });
  }

  viewAllRetailers(): Observable<any> {
    return this.http.get(API_URL+'admin/viewAllRetailers')
  }


}