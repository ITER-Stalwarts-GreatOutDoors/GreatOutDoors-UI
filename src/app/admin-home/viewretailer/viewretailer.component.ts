import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { NavServiceService } from 'src/app/_services/nav-service.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-viewretailer',
  templateUrl: './viewretailer.component.html',
  styleUrls: ['./viewretailer.component.css']
})
export class ViewretailerComponent implements OnInit {
  isLoggedIn: boolean;
  retailers: any;

  constructor(private tokenStorage: TokenStorageService,public nav:NavServiceService ,private router: Router , private userService:UserService) { }

  ngOnInit(): void {
    this.nav.show();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      }
    if(this.isLoggedIn===false){
      this.router.navigate([""]);
    }
    let list = this.userService.viewAllRetailers();
    list.subscribe((data) => this.retailers=data);
  }

  deleteProduct(index){
    var message;
     let del = this.userService.deleteProduct(this.retailers[index].retailer);
     del.subscribe((data)=> message=data);
      this.reloadPage();
    }
    reloadPage() {
      window.location.reload();
    }

}
