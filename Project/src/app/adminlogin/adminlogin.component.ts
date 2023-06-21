import { Component } from '@angular/core';
import { user } from '../shared/user';
import { Router } from '@angular/router';
import { MainService } from '../shared/main.service';
import { admin } from '../shared/admin';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent {
  user:admin=new admin;
  errorMessage: string = '';

  constructor(private router: Router,private service:MainService) {}

  ngOnInit(): void {}

  log(){
    this.service.authenticateadmin(this.user).subscribe({
      next:(res:any)=>{
        this.service.storeAdminToken(res.token);
        this.router.navigate(['admin']);
      },error:err=>{
        alert("Invalid Credentials");
        this.user.userName='';
        this.user.password='';
      }
    })
    }
    
}
