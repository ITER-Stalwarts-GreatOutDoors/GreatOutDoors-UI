import { Component, OnInit } from '@angular/core';
import { AddressService } from '../_services/address.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NavServiceService } from '../_services/nav-service.service';
import { NotificationService } from '../_services/notification.service';

@Component({
  selector: 'app-viewaddress',
  templateUrl: './viewaddress.component.html',
  styleUrls: ['./viewaddress.component.css']
})
export class ViewaddressComponent implements OnInit {

  private roles: string[];
  isLoggedIn = false;
  private userId = '';
   username = '';
   phoneno = '';
  addressList:any;
  id='0';


  constructor(private route: ActivatedRoute ,private addressService:AddressService,
    private notificationService:NotificationService, public nav:NavServiceService ,private router: Router , private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.queryParamMap.get('id');
    if(this.id===null)this.id='0';
    this.nav.show();

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (!this.isLoggedIn) {
      this.router.navigate(["/auth"]);
    }
    else{
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.userId = user.id;
      this.username = user.username;
      this.phoneno = user.phoneno;
      if(!this.roles.includes('ROLE_RETAILER')){
        this.router.navigate(["/home"]);
      }
    }
    
    
    let list = this.addressService.viewAllAddress();
    list.subscribe((data) => this.addressList=data);
    
  }

  payment(index){
    this.router.navigate(["/placeorder"],{queryParams: {addressId:this.addressList[index].addressId}})
  }

  deleteAddress(index){
    var message;
    let del = this.addressService.deleteAddress(this.addressList[index].addressId);
    del.subscribe(
      data=>{
        message =data;
      }
     
    );
    this.notificationService.showInfo("Successfully!!","Address deleted");

    this.reloadPage();

    
  }
  addAddress(){
    this.router.navigate(["/address"],{queryParams: {id:this.id}});
  }

  reloadPage() {
    window.location.reload();
  }

}
