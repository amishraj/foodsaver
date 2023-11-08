import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  [x: string]: any;

  errMessage= "Something went wrong, please check the form again" //to be used

  error = false;
  isLoading = false;
  signedUp = false;
  user: User = {
    fname: '',
    lname: '',
    email: '',
    address: '',
    phone: '',
    status:''
  };
  pg1 = true;
  pwd = '';
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.pg1 = true;
    this.pwd = '';
  }

  onSignup(form: NgForm) {
    if (form.invalid || form.value.password != form.value.reEnterPassword) {
      return;
    } else {
      this.isLoading = true;
      this.user.email = form.value.email;
      this.pwd = form.value.password;

      //switch to next page
      this.pg1 = false;
    }
  }

  onPgTwo(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      this.user.fname = form.value.firstName;
      this.user.lname = form.value.lastName;
      this.user.address = form.value.address;
      this.user.phone = form.value.cellNumber;
      this.user.status = 'unverified';

      this.authService.createUser(this.user, this.pwd).subscribe(
        (response: any) => {
          // Handle successful response
          console.log('User created successfully:', response);
          this.signedUp = true;
        },
        (error: any) => {
          // Handle error, e.g., show an error message to the user
          console.error('Error occurred during user creation:', error);
          this.error = true;
        }
      );
    }
  }
  reloadPage() {
    window.location.reload();
  }

}
