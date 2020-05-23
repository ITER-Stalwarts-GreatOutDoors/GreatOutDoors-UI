import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NavServiceService } from '../_services/nav-service.service';
import { NotificationService } from '../_services/notification.service';
import { AddressService } from '../_services/address.service';
import { NgForm } from '@angular/forms';
import { Address } from '../models/address.model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})


export class AddressComponent implements OnInit {

  private roles: string[];
  isLoggedIn = false;
  private userId = '';
  address:Address;
  addressId :any;
  id='0';
  
  

  constructor(private route: ActivatedRoute ,private addressService:AddressService,
    private notificationService:NotificationService, public nav:NavServiceService ,private router: Router , private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.queryParamMap.get('id');
    this.nav.hide();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (!this.isLoggedIn) {
      this.router.navigate(["/auth"]);
    }
    else{
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.userId = user.id;
      if(!this.roles.includes('ROLE_RETAILER')){
        this.router.navigate(["/home"]);
      }
    }
  }


  async saveAddress(form:NgForm){
    this.address = new Address();
    this.address.buildingNo = form.value.buildingNo;
    this.address.city = form.value.city;
    this.address.field = form.value.field;
    this.address.retailerId = this.userId;
    this.address.state = form.value.state;
    this.address.zip  = form.value.zip;
    
    this.addressId = await this.addressService.addAddress(this.address);
    
    if(this.id==='1'){
      this.router.navigate(['/placeorder'],{queryParams: {addressId:this.addressId}})
      
    }
    this.router.navigate(["/viewaddress"]);
    

    
    
  }


  



}
