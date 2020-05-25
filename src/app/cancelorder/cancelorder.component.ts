import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { NavServiceService } from '../_services/nav-service.service';
import { NotificationService } from '../_services/notification.service';
import { CancelorderService } from '../_services/cancelorder.service';

@Component({
  selector: 'app-cancelorder',
  templateUrl: './cancelorder.component.html',
  styleUrls: ['./cancelorder.component.css']
})
export class CancelorderComponent implements OnInit {

  constructor(private cancelService:CancelorderService, private notificationService:NotificationService , public nav:NavServiceService ,private router: Router , private tokenStorageService: TokenStorageService) { }

  private roles: string[];
  isLoggedIn = false;
  cancelProducts:any;

  ngOnInit(): void {
    this.nav.show();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (!this.isLoggedIn) {
      this.router.navigate(["/home"]);
    }
    else{
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      if(!this.roles.includes('ROLE_RETAILER')){
        this.router.navigate(["/home"]);
      }
    }
    let list = this.cancelService.getAllCancelProducts();
    list.subscribe((data)=> this.cancelProducts = data);

  }

}
