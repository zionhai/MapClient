import { LoginInfo } from './../../auth/models/auth-types';
import { AuthService } from './../../auth/auth-service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn:boolean = false;
  authenticatedUser: string = '';

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    let username = localStorage.getItem('username');
    this.authService.setCurrentUser(username);
    this.authService.userName$.subscribe(username => {
      this.isLoggedIn = this.authService.isLoggedIn();
      this.authenticatedUser = username;
    })
  }
  
  onLogin(){
    this.router.navigate(['/login']);
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
