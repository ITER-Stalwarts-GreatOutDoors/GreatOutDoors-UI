import { Component, OnInit } from '@angular/core';
import { NavServiceService } from '../_services/nav-service.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

 
  title = 'GreatOutDoors-UI';
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showProductMasterBoard = false;
  showRetailerBoard = false;
  showUserBoard = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService , public nav:NavServiceService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showProductMasterBoard = this.roles.includes('ROLE_PRODUCT_MASTER');
      this.showRetailerBoard = this.roles.includes('ROLE_RETAILER');
      this.showUserBoard = this.roles.includes('ROLE_USER');
      this.username = user.username;
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
