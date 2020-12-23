import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth-service';

@Injectable()
export class GeneralGuard implements CanActivate
{
    constructor(private authService: AuthService, private router:Router){}
    canActivate() {
        if (!this.authService.isLoggedIn()) {
          this.router.navigate(['/login']);
          
        }
        return this.authService.isLoggedIn();

        
      }
}