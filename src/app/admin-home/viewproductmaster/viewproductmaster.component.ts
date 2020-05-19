import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { NavServiceService } from 'src/app/_services/nav-service.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { NotificationService } from 'src/app/_services/notification.service';


@Component({
  selector: 'app-viewproductmaster',
  templateUrl: './viewproductmaster.component.html',
  styleUrls: ['./viewproductmaster.component.css']
})
export class ViewproductmasterComponent implements OnInit {
  productmasters: any;
  isLoggedIn: boolean;

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
    let list = this.userService.viewAllProductMasters();
    list.subscribe((data) => this.productmasters=data);
    console.log(this.productmasters);
    alert(this.productmasters[0].id)
  }

  deleteProductMaster(index){
    var message;
     let del = this.userService.deleteProductMaster(this.productmasters[index].id);
     del.subscribe(
       data=> {
         message=data;
        
        }
     );
     this.notificationService.showWarning("Successfully!!","Product Master removed");
     this.reloadPage();
    }


    reloadPage() {
      window.location.reload();
    }

}
