import { Component } from '@angular/core';
import { MainService } from '../shared/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-web-page',
  templateUrl: './web-page.component.html',
  styleUrls: ['./web-page.component.css']
})
export class WebPageComponent {
  services:any[]=[];
  constructor(public service:MainService,private route:Router){}
  ngOnInit(){
this.getAllServices();
this.service.setToken();
this.service.decodeToken();
  }
  getAllServices(){
    this.service.getService().subscribe((res:any)=>{
      this.services=res;
      console.log(this.services);
    });
  }
  subCategory(id:number){
    this.service.getServiceById(id).subscribe((res:any)=>{
      console.log(res);
      this.service.subServices=res;
      this.route.navigate(['/sub-category']);
    })
  }
  logout(){
    this.service.signout();
  }
}
