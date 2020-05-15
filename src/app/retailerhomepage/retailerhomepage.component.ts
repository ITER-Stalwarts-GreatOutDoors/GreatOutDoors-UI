import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-retailerhomepage',
  templateUrl: './retailerhomepage.component.html',
  styleUrls: ['./retailerhomepage.component.css']
})
export class RetailerhomepageComponent implements OnInit {

  title = 'Load script GFG'; 
   constructor() { 
     this.loadScripts(); 
   } 

  ngOnInit(): void {}
  
   // Method to dynamically load JavaScript 
   loadScripts() { 
       const node = document.createElement('script'); 
       node.src = 'assets/load.js'; 
       node.type = 'text/javascript'; 
       node.async = false; 
       document.getElementsByTagName('head')[0].appendChild(node); 
     
  } 

}
