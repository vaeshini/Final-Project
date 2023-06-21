import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../shared/main.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  constructor(public router: Router,public service:MainService) {}
  ngOnInit(): void {
    const payButton = document.getElementById("payButton");
    if (payButton) {
      payButton.addEventListener("click", () => {
        alert("Payment done");
      });
    }
  }
  OnSubmit(){
    this.service.payment().subscribe(res=>{
      this.router.navigate(['/web-page']);
    })
  }
}

