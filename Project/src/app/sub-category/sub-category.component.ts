import { Component } from '@angular/core';
import { MainService } from '../shared/main.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent {
  subServices:any[]=[];
  constructor(private service:MainService,private route:Router){}
  ngOnInit(){
    this.subServices=this.service.subServices;
    console.log(this.subServices);
  }
  payment(id:number){
    this.service.getPlanById(id).subscribe((res:any)=>{
      console.log(res);
      this.service.subTier=res;
      this.route.navigate(['/buy-plan']);
    })
  }
}
