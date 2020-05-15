import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { NavServiceService } from '../_services/nav-service.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  content = '';

  constructor(private userService: UserService ,  public nav:NavServiceService) { }

  ngOnInit() {
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
