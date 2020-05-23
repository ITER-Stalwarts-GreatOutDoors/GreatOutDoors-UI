import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from '../models/address.model';
@Injectable({
  providedIn: 'root'
})
export class AddressService {

  addressURL:String = "http://localhost:8580/address";
  constructor(private http:HttpClient) { }

  public viewAllAddress(){
    return this.http.get(this.addressURL+"/viewALLAddress");
  }

  async addAddress(address:Address)
  {
    return await  this.http.post(this.addressURL+"/addAddress",address,{responseType:'text'}).toPromise();
  }

  public updateAddress(address:Address)
  {
    return this.http.post(this.addressURL+"/updateAddress",address,{responseType:'text' as 'json'});
  }

  public deleteAddress(addressId:string){
    return this.http.delete(this.addressURL+"/deleteAddress?addressId="+addressId);
  }




}