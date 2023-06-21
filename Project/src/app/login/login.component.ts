import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from '../shared/user';
import { MainService } from '../shared/main.service';
import { user1 } from '../shared/user1';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  user:user=new user();
  errorMessage: string = '';

  constructor(private router: Router,private service:MainService) {}

  ngOnInit(): void {}

  log(){
    this.service.authenticate(this.user).subscribe({
      next:(res:any)=>{
        this.service.storeToken(res.token);
        this.service.token=res.token;
        this.router.navigate(['web-page']);
      },error:err=>{
        alert("Invalid Credentials");
        this.user.email='';
        this.user.password='';
      }
    })
    }
    
  
}