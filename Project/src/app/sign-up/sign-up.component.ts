import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { user1 } from '../shared/user1';
import { MainService } from '../shared/main.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  user:user1=new user1();
  firstName: string = '';
  lastName: string = '';

  phoneNumber:number=0;

  email: string = '';

  password: string = '';

  cnPassword:string='';

  errorMessage: string = '';

  constructor(private router: Router,private service:MainService) {}

  login() {

    if (

      this.firstName.trim() &&

      this.lastName.trim() &&

      this.email.trim() &&

      this.password.trim()

    ) {

      // First Name validation


      if (!this.validateName(this.firstName)) {

        this.errorMessage = 'Please enter a valid first name.';
        alert(this.errorMessage);

        return;

      }


      // Last Name validation

      if (!this.validateName(this.lastName)) {

        this.errorMessage = 'Please enter a valid last name.';
       
        alert(this.errorMessage);

        return;

      }

      // Phone Number validation


      if (!this.validatePhoneNumber(this.phoneNumber)) {

        this.errorMessage = 'Please enter a valid phone number (10 digits).';
    
        alert(this.errorMessage);

        return;

      }

      // Email validation


      if (!this.validateEmail(this.email)) {

        this.errorMessage = 'Please enter a valid email address.';
       
        alert(this.errorMessage);
        return;

      }
      // Password validation


      if (this.password.length < 10) {

        this.errorMessage = 'Password should be at least 8 characters long.';
      
        alert(this.errorMessage);
        return;

      }

      if(this.password!=this.cnPassword){
        this.errorMessage = 'Password is not matching';
      
        alert(this.errorMessage);
        return;

      }

      // Perform authentication or further processing here

      this.user.firstName=this.firstName;
      this.user.lastName=this.lastName;
      this.user.phoneNumber=this.phoneNumber;
      this.user.email=this.email;
      this.user.password=this.password;
      this.service.addUser(this.user).subscribe(res=>{
        alert("Data added successfully");
        this.router.navigate(['/login']);
      })


      
    

    } else {

      this.errorMessage = 'Please fill in all the fields.';

    }
  }
  


  validateName(name: string): boolean {

    const nameRegex = /^[a-zA-Z\s]+$/;

    return nameRegex.test(name);

  }


  validatePhoneNumber(phoneNumber: number): boolean {

    const phoneRegex = /^[0-9]{10}$/;

    return phoneRegex.test(phoneNumber.toString());

  }

  validateEmail(email: string): boolean {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);

  }
}