import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MainService } from '../shared/main.service';

@Injectable({
  providedIn: 'root'
})
export class AdminauthGuard implements CanActivate {
  constructor(private service:MainService,private route:Router){}
  canActivate():boolean{
    if(this.service.isAdminLoggedIn()){
      return true;
    }
    else
    {
      this.route.navigate(['ad-login']);
      return false;
    }
  }
  
}

  