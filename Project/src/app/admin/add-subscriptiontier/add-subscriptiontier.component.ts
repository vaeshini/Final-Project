import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/shared/main.service';
import { subscriptionplan } from 'src/app/shared/subscriptionplan';

@Component({
  selector: 'app-add-subscriptiontier',
  templateUrl: './add-subscriptiontier.component.html',
  styleUrls: ['./add-subscriptiontier.component.css']
})
export class AddSubscriptiontierComponent {
  subscription:subscriptionplan=new subscriptionplan();
  subServ:any[]=[];
  subServId:number=0;
  plan1:string='Basic';
  amt1:number=0;
  duration1:number=28;
  plan2:string='Standard';
  amt2:number=0;
  duration2:number=84;
  plan3:string='Premium'
  amt3:number=0;
  duration3:number=168;

  ngOnInit(): void {
      this.getAllSubServicesRemaining();
  }
  constructor(public service:MainService,private route:Router){}

  getAllSubServicesRemaining(){
    this.service.getSubSeviceRemaining().subscribe((res:any)=>{
      console.log(res);
      this.subServ=res;
    });
  }
  onSubmit(form: NgForm) {
    this.addBasicInfo();
  }

  addBasicInfo(){
    this.subscription.tierName=this.plan1;
    this.subscription.price=this.amt1;
    this.subscription.duration=this.duration1;
    this.subscription.subServiceId=this.subServId;
    this.service.addSubscription(this.subscription).subscribe(res=>{
      this.addMediumInfo();
    });
  }
  addMediumInfo(){
    this.subscription.tierName=this.plan2;
    this.subscription.price=this.amt2;
    this.subscription.duration=this.duration2;
    this.subscription.subServiceId=this.subServId;
    this.service.addSubscription(this.subscription).subscribe(res=>{
      this.addStandardInfo();
    });
  }
  addStandardInfo(){
    this.subscription.tierName=this.plan3;
    this.subscription.price=this.amt3;
    this.subscription.duration=this.duration3;
    this.subscription.subServiceId=this.subServId;
    this.service.addSubscription(this.subscription).subscribe(res=>{
      alert("Subscription Plan Details added successfully");
    this.route.navigate(['/admin/subscription']);
    });
  }
  
}
