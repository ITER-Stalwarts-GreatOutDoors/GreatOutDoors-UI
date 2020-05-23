import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NavServiceService } from '../_services/nav-service.service';
import { AddToCartServiceService } from '../_services/add-to-cart-service.service';
import { NotificationService } from '../_services/notification.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {


  private roles: string[];
  isLoggedIn = false;
  private userId = '';
  products:any;
  addressId:string;
  constructor(private route: ActivatedRoute ,private notificationService:NotificationService,private service:AddToCartServiceService , public nav:NavServiceService ,private router: Router , private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {

    this.addressId=this.route.snapshot.queryParamMap.get('addressId');
    this.notificationService.showWarning("Page!!","Don't refresh this");
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
    
    this.nav.hide();
    let list = this.service.viewProductsFromCart();
    list.subscribe((data) => this.products=data);
  }


  subTotal() {
    var subTotal = 0;

    for (var i = 0; i < this.products.length; i++) {
      subTotal += this.products[i].quantity * this.products[i].price;
    }

    return subTotal;
  }

  backToShopping(){
    this.router.navigate(["/retailer"]);
  }

  placeOrder(){
    var message;
   
    let ord = this.service.placeOrder(this.userId,this.addressId,this.subTotal());
    ord.subscribe(
      data=>{
        message=data;
        this.notificationService.showInfo("Successfully!","Order placed");
      },
      err=>{
        this.notificationService.showError("please try again!!","Fail to place order");
      }

    );
    
    this.router.navigate(['/retailer']);
  }


}
