import { Component } from '@angular/core';
import { MainService } from 'src/app/shared/main.service';
import { user1 } from 'src/app/shared/user1';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users:any[]=[];
  constructor(private service:MainService){}
  ngOnInit(){
    this.getAllUsers();
  }
  getAllUsers(){
    this.service.getAllUsers().subscribe((res:any)=>{
      this.users=res;
    });
  }

  deleteUser(id:number){
    if(confirm("You want to delete user")){
    this.service.deleteUser(id).subscribe(res=>{
      alert("User Deleted Successfully");
      window.location.reload();
    });
  }
  }

}
