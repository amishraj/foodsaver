import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
[x: string]: any;

  isLoading=false;
  signedUp=false;

  constructor(public authService: AuthService){}

  onSignup(form: NgForm){
    if(form.invalid){
        return;
    } else{
      this.isLoading=true;
      this.authService.createUser(form.value.email, form.value.password);
      //assume success
      this.signedUp=true;
    }
  }

}
