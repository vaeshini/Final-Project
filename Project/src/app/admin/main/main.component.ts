import { Component, OnInit } from '@angular/core';
import { faServicestack } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { MainService } from 'src/app/shared/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  faUser=faUser;
  faService=faServicestack;
  totalUsers=0;
  totalServices=0;
  totalSubServices=0;
  totalUserSubscription=0
  totalSubscription=0;
  totalUserNotSubscribed=0;
  

  constructor(private service:MainService){}
  ngOnInit(): void {
      this.getTotalUsers();
      this.getTotalServices();
      this.getTotalSubServices();
      this.getTotalUserSubscription();
      this.getTotalSubscription()
      this.getTotalUserNotSubscribed();
      this.service.setAdminToken();
      this.service.decodeAdminToken();
  }

  getTotalUsers(){
    this.service.getTotalUsers().subscribe((res:any)=>{
      this.totalUsers=res;
    })
  }

  getTotalServices(){
    this.service.getTotalServices().subscribe((res:any)=>{
      this.totalServices=res;
    })
  }

  getTotalSubServices(){
    this.service.getTotalSubServices().subscribe((res:any)=>{
      this.totalSubServices=res;
    })
  }

  getTotalUserSubscription(){
    this.service.getTotalUserSubscriptions().subscribe((res:any)=>{
      this.totalUserSubscription=res;
    })
  }

  getTotalSubscription(){
    this.service.getTotalSubscription().subscribe((res:any)=>{
      console.log(res);
      this.totalSubscription=res;
    })
  }

  getTotalUserNotSubscribed(){
    this.service.getTotalUserNotSubscribed().subscribe((res:any)=>{
      this.totalUserNotSubscribed=res;
    })
  }
}
