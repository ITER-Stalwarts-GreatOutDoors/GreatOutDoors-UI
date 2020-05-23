import { Component, OnInit } from '@angular/core';
import { AddToCartServiceService } from '../_services/add-to-cart-service.service';
import { NavServiceService } from '../_services/nav-service.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { NotificationService } from '../_services/notification.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private roles: string[];
  isLoggedIn = false;
  private userId = '';
  products:any;
  constructor(private notificationService:NotificationService,private service:AddToCartServiceService , public nav:NavServiceService ,private router: Router , private tokenStorageService: TokenStorageService) { }

  
  ngOnInit(): void {
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


  

  tax : number= 5;
  // promotions: [
  //   {
  //     code: "SUMMER",
  //     discount: "50%"
  //   },
  //   {
  //     code: "AUTUMN",
  //     discount: "40%"
  //   },
  //   {
  //     code: "WINTER",
  //     discount: "30%"
  //   }
  // ]
  // promoCode:any= "";
   discount = 0


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

  discountPrice() {
    return this.subTotal() * this.discount / 100;
  }

  totalPrice() {
    return this.subTotal() - this.discountPrice() + this.tax;
  }


  currencyFormatted(value) {
    return Number(value).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0});
  }


  updateQuantity(index, event) {
    var product = this.products[index];
    var value = event;
    var valueInt : any = parseInt(value);

    // Minimum quantity is 1, maximum quantity is 100, can left blank to input easily
    if (value === "") {
      product.quantity = value;
    } else if (valueInt > 0 && valueInt < 100) {
      product.quantity = valueInt
    }

    this.products[index] = product;
  }


  checkQuantity(index, event) {

    // Update quantity to 1 if it is empty
    if (event.target.value === "") {
      var product = this.products[index];
      product.quantity = 1;

      this.products[index]=product;
    }
  }

  removeItem(index) {
    var message;
    if(this.itemCount()==1){
      this.notificationService.showWarning("Please add items!!","No item present in the cart");
    }
    let remove = this.service.removeItemFromCart(this.products[index].productId,this.userId);
    remove.subscribe((data) => message=data);
    this.products.splice(index, 1);

  
    
  }
  backToShopping(){
    this.router.navigate(["/retailer"]);
  }

  checkout(){
    this.router.navigate(['/viewaddress'],{queryParams: {id:1}});
  }


  // checkPromoCode(event){
  //   for (var i = 0; i < this.promotions.length; i++) {
  //     if (event.target.value === this.promotions[i].code) {
  //       this.discount = parseFloat(
  //         this.promotions[i].discount.replace("%", "")
  //       );
  //       return;
  //     }
  //   }

  //   alert("Sorry, the Promotional code you entered is not valid!");
  // }



  

}
