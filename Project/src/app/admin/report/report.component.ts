import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/shared/main.service';
import{Chart,registerables}from'node_modules/chart.js'
Chart.register(...registerables);
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit{
  report:any;
  serviceName:any[]=[];
  subDet:any[]=[];
  constructor(private service:MainService){}
  ngOnInit(): void {
    this.service.getReport().subscribe((res:any)=>{
      this.report=res;
      if(this.report!=null){
        for(let i=0;i<this.report.length;i++){
         // console.log(this.report[i]);
         this.serviceName.push(this.report[i].serviceName);
         this.subDet.push(this.report[i].totalSubscription);
        }

      this.RenderChart(this.serviceName,this.subDet,'bar','barchart');
      this.RenderChart(this.serviceName,this.subDet,'pie','piechart');
      }
    });
  }
  
  RenderChart(serviceName:any,subDet:any,type:any,id:any){
    new Chart(id, { 
      type: type,
      data: {
        labels:serviceName,
        datasets: [{
          label: '# of Subscription',
          data: subDet,
          backgroundColor:[
            'green','yellow','pink','red','blue','orange'
          ],
          borderColor:[],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
