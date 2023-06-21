import { Component } from '@angular/core';
import { MainService } from 'src/app/shared/main.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  services:any[]=[];
  constructor(private service:MainService){

  }
  ngOnInit(){
    this.getAllServices();
  }
  getAllServices(){
    this.service.getService().subscribe((res:any)=>
      {
        this.services=res;
      })
  }
  deleteService(id:number){
    if(confirm("You want to delete Service")){
    this.service.deleteService(id).subscribe(res=>
      {
        alert("Servcie deleted successfully");
        window.location.reload();
      });
    }
  }
}
