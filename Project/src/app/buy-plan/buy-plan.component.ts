import { Component } from '@angular/core';
import { MainService } from '../shared/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy-plan',
  templateUrl: './buy-plan.component.html',
  styleUrls: ['./buy-plan.component.css']
})
export class BuyPlanComponent {
  subTiers:any[]=[];
  constructor(private service:MainService,private route:Router){
    
  }
  ngOnInit(){
    this.subTiers=this.service.subTier;
    console.log(this.subTiers);
  }

  sendData(id:number){
    this.service.getTierById(id).subscribe(res=>{
      this.service.tierDet=res;
      console.log(this.service.tierDet);
      this.route.navigate(['/payment']);
    });
  }
}
