import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { NavServiceService } from '../_services/nav-service.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private roles: string[];
  content: string;
  isLoggedIn = false;
  isRetailer = false;
  a = 0;
 

  

  constructor(private tokenStorageService: TokenStorageService ,private userService: UserService ,  public nav:NavServiceService,private router: Router ) { }

  ngOnInit() { 

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this. isRetailer = this.roles.includes('ROLE_RETAILER');

    }

    this.nav.show();
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  loadedFeature='home';
  onNavigate(feature: string){
    this.loadedFeature= feature;
}


}
