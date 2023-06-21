import { Component,OnInit } from '@angular/core';
import { MainService } from 'src/app/shared/main.service';
import { service } from 'src/app/shared/service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit{
  name:string='';
  selectedFile:any;
  ngOnInit(): void {
      
  }
  constructor(public service:MainService,private route:Router){}
  onselectFile(e:any){
    this.selectedFile=e.target.files[0];
  }
  onSubmit(form: NgForm) {
    const formData:FormData=new FormData();
    formData.append('serviceName',this.name);
    formData.append('file',this.selectedFile);
    this.service.addService(formData).subscribe(
      res=>{ 
        alert("Service Details added successfully");
        this.route.navigate(['/admin/service']);
      }
    );
   
  }
  
}
