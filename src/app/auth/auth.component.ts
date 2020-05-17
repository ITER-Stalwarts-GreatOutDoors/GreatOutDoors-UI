import { Component, OnInit } from '@angular/core';
import * as $ from 'jQuery';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { NavServiceService } from '../_services/nav-service.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


  // "./src/custom.js"
  isSuccessful = false;
  isSignUpFailed = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  currentRole = '';

  constructor(private authService: AuthService ,  private tokenStorage: TokenStorageService , private router: Router ,  public nav:NavServiceService) { this.loadScripts()}

  ngOnInit(){
    this.nav.hide();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;

      if(this.roles.includes('ROLE_ADMIN')){
        this.router.navigate(['/admin']);
      }
  
      else if(this.roles.includes('ROLE_PRODUCT_MASTER')){
        this.router.navigate(['/master']);
      }
  
      else if(this.roles.includes('ROLE_RETAILER')){
        this.router.navigate(['/retailer']);
      }
  
      else if(this.roles.includes('ROLE_USER')){
        this.router.navigate(['/user']);
      }

    }
  }
  
  onSignin(form: NgForm){

    console.log(form.value)
    this.authService.login(form.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
    console.log(this.roles);

    form.reset();

  }

  onSignup(form: NgForm){
    this.authService.register(form.value).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.isLoggedIn = true;

      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
    
    form.reset();
    this.router.navigate(['']);
   

  }

  loadScripts() { 
    const node = document.createElement('script'); 
    node.src = 'assets/custom.js'; 
    node.type = 'text/javascript'; 
    node.async = false; 
    document.getElementsByTagName('head')[0].appendChild(node); 
  
} 
reloadPage() {
  window.location.reload();
}

// getRoleAndNavigate(){
//   // this.currLogin = !!this.tokenStorage.getToken();
//   // alert(this.currRoles[0]);
//   // alert(this.currLogin);
//   // if (this.currLogin) {
//   //   const user = this.tokenStorage.getUser();
//   //   this.currRoles = user.roles;
    

//     if(this.roles.includes('ROLE_ADMIN')){
//       this.router.navigate(['/admin']);
//     }

//     else if(this.roles.includes('ROLE_PRODUCT_MASTER')){
//       this.router.navigate(['/user']);
//     }

//     else if(this.roles.includes('ROLE_RETAILER')){
//       this.router.navigate(['/master']);
//     }

//     else if(this.roles.includes('ROLE_USER')){
//       this.router.navigate(['/retailer']);
//     }
    
  // }
}



 
  


