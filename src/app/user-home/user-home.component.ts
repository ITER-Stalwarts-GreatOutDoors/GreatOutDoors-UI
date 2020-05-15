import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { NavServiceService } from '../_services/nav-service.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  constructor(private userService: UserService ,  public nav:NavServiceService) { }

  content = '';
  ngOnInit(): void {

    this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

}
