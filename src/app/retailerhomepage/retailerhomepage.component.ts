import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { NavServiceService } from '../_services/nav-service.service';

@Component({
  selector: 'app-retailerhomepage',
  templateUrl: './retailerhomepage.component.html',
  styleUrls: ['./retailerhomepage.component.css']
})
export class RetailerhomepageComponent implements OnInit {

  content = '';
  title = 'Load script GFG'; 
   constructor(private userService: UserService ,  public nav:NavServiceService) { 
     this.loadScripts(); 
   } 

  ngOnInit(){
    this.nav.show();
    this.userService.getRetailerBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
  
   // Method to dynamically load JavaScript 
   loadScripts() { 
       const node = document.createElement('script'); 
       node.src = 'assets/load.js'; 
       node.type = 'text/javascript'; 
       node.async = false; 
       document.getElementsByTagName('head')[0].appendChild(node); 
     
  } 

}
