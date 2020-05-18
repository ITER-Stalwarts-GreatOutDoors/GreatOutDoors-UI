import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { NavServiceService } from '../_services/nav-service.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  content = '';
  private roles: string[];
  isLoggedIn = false;

  constructor(private router: Router ,private userService: UserService ,  public nav:NavServiceService  , private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (!this.isLoggedIn) {
      this.router.navigate(["/auth"]);
    }
    else{
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      if(!this.roles.includes('ROLE_ADMIN')){
        this.router.navigate(["/home"]);
      }
    }
    this.nav.show();
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

}
