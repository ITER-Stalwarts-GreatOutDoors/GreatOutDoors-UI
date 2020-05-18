import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { RetailerService } from 'src/app/_services/retailer.service';
import { NavServiceService } from 'src/app/_services/nav-service.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {

  isLoggedIn = false;
  products:any;


 

  constructor(private tokenStorage: TokenStorageService ,private retailerService:RetailerService,  public nav:NavServiceService ,private router: Router , private userService:UserService) { }

  ngOnInit(): void {
    this.nav.show();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      }
    if(this.isLoggedIn===false){
      this.router.navigate([""]);
    }
    let list = this.retailerService.viewAllProducts();
    list.subscribe((data) => this.products=data);
  }

  deleteProduct(index){
  var message;
   let del = this.userService.deleteProduct(this.products[index].productId);
   console.log(this.products[index]);
   del.subscribe((data)=> message=data);
    this.reloadPage();
  }
  reloadPage() {
    window.location.reload();
  }

}
