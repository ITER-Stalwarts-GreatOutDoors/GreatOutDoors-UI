import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { NavServiceService } from 'src/app/_services/nav-service.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-viewretailer',
  templateUrl: './viewretailer.component.html',
  styleUrls: ['./viewretailer.component.css']
})
export class ViewretailerComponent implements OnInit {
  isLoggedIn: boolean;
  retailers: any;
  private roles: string[];

  constructor(private notificationService:NotificationService,private tokenStorage: TokenStorageService,public nav:NavServiceService ,private router: Router , private userService:UserService) { }

  ngOnInit(): void {
    this.nav.show();
    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (!this.isLoggedIn) {
      this.router.navigate(["/home"]);
    }
    else{
      const user = this.tokenStorage.getUser();
      this.roles = user.roles;
      if(!this.roles.includes('ROLE_ADMIN')){
        this.router.navigate(["/home"]);
      }
    }
    let list = this.userService.viewAllRetailers();
    list.subscribe((data) => this.retailers=data);
  }

  deleteRetailer(index){
    var message;
    let del = this.userService.deleteRetailer(this.retailers[index].id);
    del.subscribe(
      data=> {
        message=data;
       
       }
    );
    this.notificationService.showWarning("Successfully!!","Retailer removed");
    this.reloadPage();

    }
    
    reloadPage() {

      window.location.reload();
    }

}
