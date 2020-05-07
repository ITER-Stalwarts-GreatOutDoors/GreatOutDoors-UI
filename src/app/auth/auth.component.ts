import { Component, OnInit } from '@angular/core';
import * as $ from 'jQuery';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {}
  
  onSignin(form: NgForm){

    form.reset();
  }

  onSignup(form: NgForm){

    form.reset();
  }

 
  

}
