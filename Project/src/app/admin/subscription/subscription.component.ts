import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { MainService } from 'src/app/shared/main.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent {
  constructor(private service:MainService,private route:Router){}
  subscriptionTier:any[]=[];
  ngOnInit(){
    this.getAllSubscriptionTier();
  }
  
  getAllSubscriptionTier(){
    this.service.getSubscriptionTier().subscribe((res:any)=>{
      this.subscriptionTier=res;
      console.log(res);
    })
  }

  editTier(id:number){
    this.service.getSubscriptionTierbyId(id).subscribe((res:any)=>{
      this.service.updateTier=res;
      this.route.navigate(['/admin/edit-tier']);
    });
  }

}
