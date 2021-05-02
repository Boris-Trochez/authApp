import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  myForm: FormGroup = this.fb.group({
    email: ['test1@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService ) { }

  login() {
    // this.authService.validateToken()
    //   .subscribe( console.log ); // console.log -->  res => console.log( res );
    console.log(this.myForm.value);
    const { email, password } = this.myForm.value;
    //this.router.navigateByUrl('/dashboard');
    this.authService.login( email, password )
      .subscribe( ( valid ) => {
        console.log( valid );
        if( valid === true ) {
          this.router.navigateByUrl('/dashboard');

        } else {
          Swal.fire('Error', valid, 'error'); //Main title, Message to show, icon
        }
      });
  }

}
