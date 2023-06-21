import { Component } from '@angular/core';
import { user1 } from '../shared/user1';
import { MainService } from '../shared/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  userData:user1=new user1()
  userSubDet:any;
  constructor(private service:MainService,private route:Router){

  }
  ngOnInit(){
    this.service.setToken();
    this.service.decodeToken();
    this.getDataById(this.service.userData.userId);
    this.getUserSubDet(this.service.userData.userId);
  }

  getDataById(id:number){
    this.service.getUserById(id).subscribe((res:user1)=>{
      this.userData=res;
    });
  }
  update(){
    this.service.updateUser(this.userData).subscribe(res=>{
      alert("User Data Updated successfully");
      window.location.reload();
    })
  }

  getUserSubDet(id:number){
    this.service.getSubDetails(id).subscribe(res=>{
      this.userSubDet=res;
    })
  }

}
