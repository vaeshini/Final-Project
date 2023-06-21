import { Component } from '@angular/core';
import { MainService } from 'src/app/shared/main.service';

@Component({
  selector: 'app-sub-servies',
  templateUrl: './sub-servies.component.html',
  styleUrls: ['./sub-servies.component.css']
})
export class SubServiesComponent {
  subservices:any[]=[];
  constructor(private service:MainService){

  }
  ngOnInit(){
    this.getAllServices();
  }
  getAllServices(){
    this.service.getSubSerDet().subscribe((res:any)=>
      {
        this.subservices=res;
        console.log(res);
      })
  }

  deleteSubService(id:number){
    if(confirm("You want to delete this Sub-Service")){
    this.service.deleteSubService(id).subscribe(res=>
      {
        alert("Sub-Servcie deleted successfully");
        window.location.reload();
      });
    }
  }
}
