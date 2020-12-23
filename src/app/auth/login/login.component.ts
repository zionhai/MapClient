import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoggedIn: boolean = false;
  invalidLogin: boolean = false;

  constructor(private authService:AuthService, private router:Router){}
  
  ngOnInit()
  {
      if (this.isLoggedIn)
      {
          this.router.navigate(['/home']);
      }
  }
  onSubmit(authForm:NgForm)
   {
      var username = authForm.value["username"];
      var password = authForm.value["password"];
      console.log("here");

      let authObs:Observable<boolean>
      authObs = this.authService.login({username, password});

      authObs.subscribe(
          resData =>{
              
              this.router.navigate(['/map']);
              this.isLoggedIn = true;
          },
          (error => {
              //console.log(this.isLoggedIn);
              this.invalidLogin = true;
          })      
      )
      //authForm.reset();
  }
}
