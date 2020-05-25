import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../_services/order.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { NavServiceService } from '../_services/nav-service.service';
import { NotificationService } from '../_services/notification.service';
import { CancelorderService } from '../_services/cancelorder.service';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})
export class OrderdetailComponent implements OnInit {

  orderId:string;
  products:any;
  private roles: string[];
  isLoggedIn = false;
  private userId = '';
  constructor(private cancelService:CancelorderService, private route: ActivatedRoute ,private orderService: OrderService ,private notificationService:NotificationService , public nav:NavServiceService ,private router: Router , private tokenStorageService: TokenStorageService ) { }

  ngOnInit(): void {
    this.nav.show();
    this.orderId=this.route.snapshot.queryParamMap.get('orderId');

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (!this.isLoggedIn) {
      this.router.navigate(["/home"]);
    }
    else{
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.userId = user.id;
      if(!this.roles.includes('ROLE_RETAILER')){
        this.router.navigate(["/home"]);
      }
    }
    
    
    let list = this.orderService.getAllProductsOfOrder(this.orderId);
    list.subscribe((data) => this.products=data);
  }



  itemCount() {
    var count:number = 0;

    for (var i = 0; i < this.products.length; i++) {
      count += this.products[i].quantity || 0;
    }

    return count;
  }


  subTotal() {
    var subTotal = 0;

    for (var i = 0; i < this.products.length; i++) {
      subTotal += this.products[i].quantity * this.products[i].price;
    }

    return subTotal;
  }


  removeItem(index) {
    var message;
    let cancelProduct = this.cancelService.cancelProduct(this.orderId,this.userId,this.products[index].productId);
    cancelProduct.subscribe(
      data => {
        message=data;
        this.notificationService.showWarning("Refund initiated!!","Product canceled successfully");
        this.reloadPage();
      },
      err =>{
        this.notificationService.showError("Please try again!!","Fail to cancel this product");
      }
    );

    
  }

  cancelOrder(){
    var message;
   
    let cancel = this.cancelService.cancelOrder(this.orderId,this.userId);
    cancel.subscribe(
        data=>{
          message=data;
          this.notificationService.showWarning("Refund initiated!!","Order canceled successfully");
          this.router.navigate(["/order"]);
        },
        err=>{
          this.notificationService.showError("Please try again!!","Fail to cancel order");
        }
    );
  }

  reloadPage() {
    window.location.reload();
  }

}
