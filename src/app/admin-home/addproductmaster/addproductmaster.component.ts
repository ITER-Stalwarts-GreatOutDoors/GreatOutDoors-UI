import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-addproductmaster',
  templateUrl: './addproductmaster.component.html',
  styleUrls: ['./addproductmaster.component.css']
})
export class AddproductmasterComponent implements OnInit {
  isLoggedIn: boolean;
  roles: any;
  user: any;

  constructor(private userService:UserService,private router: Router, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
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
  }

  AddProductMaster(form:NgForm)
  {
    var message = '';
    this.user = new User();
    this.user.username = form.value.username;
    this.user.password = form.value.password;
    this.user.email = form.value.email;
    this.user.phone = form.value.phone;
    console.log(this.user);
    let add = this.userService.addProductMaster(this.user);
    add.subscribe((data)=>message=data);
    this.router.navigate(["/productmaster"]);
  }

}
