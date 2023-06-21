import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MainService } from '../shared/main.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service:MainService,private route:Router){}
  canActivate():boolean{
    if(this.service.isLoggedIn()){
      return true;
    }
    else
    {
      this.route.navigate(['login']);
      return false;
    }
  }
  
}
