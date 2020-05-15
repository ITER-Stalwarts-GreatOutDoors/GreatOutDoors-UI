import { Component, OnInit } from '@angular/core';
import { NavServiceService } from '../nav-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public nav:NavServiceService) { }

  ngOnInit(): void {
    
  }

}
