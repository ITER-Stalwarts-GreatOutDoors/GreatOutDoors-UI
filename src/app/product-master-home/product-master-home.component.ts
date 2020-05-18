import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { NavServiceService } from '../_services/nav-service.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-product-master-home',
  templateUrl: './product-master-home.component.html',
  styleUrls: ['./product-master-home.component.css']
})
export class ProductMasterHomeComponent implements OnInit {

  content = '';
  private roles: string[];
  isLoggedIn = false;

  constructor(private router: Router ,private userService: UserService ,  public nav:NavServiceService  , private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    if (!this.isLoggedIn) {
      this.router.navigate(["/auth"]);
    }
    else{
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      if(!this.roles.includes('ROLE_PRODUCT_MASTER')){
        this.router.navigate(["/home"]);
      }
    }
    this.userService.getProductMasterBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

}
