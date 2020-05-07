import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-master',
  templateUrl: './admin-master.component.html',
  styleUrls: ['./admin-master.component.css']
})
export class AdminMasterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onMasterSignin(form: NgForm){}

  onAdminSignin(form: NgForm){}

}
