import { Component } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { MainService } from 'src/app/shared/main.service';
import { NgForm } from '@angular/forms';
import { subscriptionplan } from 'src/app/shared/subscriptionplan';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-subscritpiontier',
  templateUrl: './edit-subscritpiontier.component.html',
  styleUrls: ['./edit-subscritpiontier.component.css']
})
export class EditSubscritpiontierComponent {
  constructor(public service: MainService,private route:Router) { }
  ngOnInit() {
  }
  
  onSubmit(form:NgForm){
    this.service.updateSubscriptionTier().subscribe(res=>{
      alert("Subscription Tier Updated Successfully");
      this.route.navigate(['/admin/subscription'])
    })
  }
}
