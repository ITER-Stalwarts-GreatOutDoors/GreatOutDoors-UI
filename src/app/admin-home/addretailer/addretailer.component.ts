import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-addretailer',
  templateUrl: './addretailer.component.html',
  styleUrls: ['./addretailer.component.css']
})
export class AddretailerComponent implements OnInit {
  isLoggedIn: boolean;
  roles: any;
  user: any;

  constructor(private notificationService:NotificationService,private userService:UserService,private router: Router, private tokenStorageService: TokenStorageService) { }


  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (!this.isLoggedIn) {
      this.router.navigate(["/home"]);
    }
    else{
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      if(!this.roles.includes('ROLE_ADMIN')){
        this.router.navigate(["/home"]);
      }
    }
  }

  AddRetailer(form:NgForm)
  {
    var message = '';
    this.user = new User();
    this.user.username = form.value.username;
    this.user.password = form.value.password;
    this.user.email = form.value.email;
    this.user.phoneno = form.value.phoneno;
    console.log(this.user);
    let add = this.userService.addRetailer(this.user);
    add.subscribe(
      data=>{
        message=data
        this.notificationService.showSuccess("Successfully!!","Retailer added");
      
      },
      err=>{
        this.notificationService.showError("Please try again!!","Fail to add");
      }
      
      );
    this.router.navigate(["/admin"]);
  }

}
