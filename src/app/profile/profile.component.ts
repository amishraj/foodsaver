import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  constructor(private authService: AuthService){}

  user:User={
    fname:'',
    lname:'',
    email:'',
    address:'',
    phone:'',
    status:''
  }

  ngOnInit() {
    this.user ={
      fname:'',
      lname:'',
      email:'',
      address:'',
      phone:'',
      status:''
    }

    this.authService.getCurrentUser().subscribe(
      (user: User) => {
        this.user = user;
      },
      (error) => {
        console.error(error);
        // Handle the error if needed
      }
    );
  }

}
