import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../shared/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private route:Router,private service:MainService){}
  ngOnInit(){
    this.service.deleteUserSubscriptionDetails().subscribe(res=>{
      console.log(res);
    });
  }
log(){
  this.route.navigate(['/login'])
}
};
