import { Component, OnInit } from '@angular/core';
import { AddToCartServiceService } from '../_services/add-to-cart-service.service';
import { NavServiceService } from '../_services/nav-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  products:any;
  constructor(private service:AddToCartServiceService , public nav:NavServiceService ,private router: Router) { }

  ngOnInit(): void {
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
    let remove = this.service.removeItemFromCart(this.products[index].productId);
    remove.subscribe((data) => message=data);
    this.products.splice(index, 1);
  
    
  }
  backToShopping(){
    this.router.navigate(["/retailer"]);
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
