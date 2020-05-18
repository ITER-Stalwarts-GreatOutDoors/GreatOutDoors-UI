import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { NavServiceService } from 'src/app/_services/nav-service.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-viewproductmaster',
  templateUrl: './viewproductmaster.component.html',
  styleUrls: ['./viewproductmaster.component.css']
})
export class ViewproductmasterComponent implements OnInit {
  productmasters: any;
  isLoggedIn: boolean;

  constructor(private tokenStorage: TokenStorageService,public nav:NavServiceService ,private router: Router , private userService:UserService) { }

  ngOnInit(): void {
    this.nav.show();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      }
    if(this.isLoggedIn===false){
      this.router.navigate([""]);
    }
    let list = this.userService.viewAllProductMasters();
    list.subscribe((data) => this.productmasters=data);
  }

  deleteProduct(index){
    var message;
     let del = this.userService.deleteProduct(this.productmasters[index].productmaster);
     del.subscribe((data)=> message=data);
      this.reloadPage();
    }
    reloadPage() {
      window.location.reload();
    }

}
