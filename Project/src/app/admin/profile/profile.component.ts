import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { admin1 } from 'src/app/shared/admin1';
import { MainService } from 'src/app/shared/main.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  adminData:admin1=new admin1()
  constructor(private service:MainService,private route:Router){

  }
  ngOnInit(){
    this.service.setAdminToken();
    this.service.decodeAdminToken();
    this.getDataById(this.service.adminData.adminId);

  }

  getDataById(id:number){
    this.service.getAdminrById(id).subscribe((res:any)=>{
      this.adminData=res;
      console.log(this.adminData);
    });
  }
  onSubmit(){
    this.service.updateAdmin(this.adminData).subscribe(res=>{
      alert("Admin Data Updated Successfully");
    })
  }
}
