import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/shared/main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public service:MainService ,private route:Router){}

  logout(){
    this.service.adminSignout();
    this.route.navigate(['ad-login']);
  }

}
