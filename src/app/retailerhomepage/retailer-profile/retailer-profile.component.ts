import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-retailer-profile',
  templateUrl: './retailer-profile.component.html',
  styleUrls: ['./retailer-profile.component.css']
})
export class RetailerProfileComponent implements OnInit {

  constructor(private router: Router ,private tokenStorageService: TokenStorageService) { }

  private roles: string[];
  isLoggedIn = false;
  phoneno='';
  username='';
  email='';
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (!this.isLoggedIn) {
      this.router.navigate(["/home"]);
    }
    else{
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.phoneno = user.phoneno;
      this.email = user.email;
      this.username=user.username;
      if(!this.roles.includes('ROLE_RETAILER')){
        this.router.navigate([""]);
      }
    }
  }
  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
