import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/shared/main.service';
import { subservice } from 'src/app/shared/subservice';

@Component({
  selector: 'app-add-sub-ser',
  templateUrl: './add-sub-ser.component.html',
  styleUrls: ['./add-sub-ser.component.css']
})
export class AddSubSerComponent {
  serv:any[]=[];
  name:string='';
  imgPath:string='';
  servId:number=0;
  selectedFile:any;
  subSer:subservice=new subservice();
  ngOnInit(): void {
      this.getAllServices();
  }
  constructor(public service:MainService,private route:Router){}
  getAllServices(){
    this.service.getService().subscribe((res:any)=>{
      console.log(res);
      this.serv=res;
    });
  }

  onselectFile(e:any): void{
    this.selectedFile=e.target.files[0];
  }
  onSubmit(form: NgForm) {
    const formData:FormData=new FormData();
    formData.append('file',this.selectedFile);
    this.service.addImage(formData).subscribe(
      (res:any)=>{ 
        this.imgPath=res.path;
        this.addSubService();

      }
    );
  }
  addSubService(){
    this.subSer.subServiceName=this.name;
    this.subSer.image=this.imgPath;
    this.subSer.serviceId=this.servId;
    this.service.addSubService(this.subSer).subscribe(res=>{
      alert("Service Details added successfully");
      this.route.navigate(['/admin/add-subscription']);
    });
  }
}
