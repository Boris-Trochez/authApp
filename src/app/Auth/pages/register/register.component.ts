import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  myRegisterForm: FormGroup = this.fb.group({
    name: ['test2', [Validators.required]],
    email: ['test2@test.com', [Validators.required, Validators.email]],
    password: ['12345678', [Validators.required, Validators.minLength(6)]]
  });
  
  constructor( private fb: FormBuilder, 
               private router: Router,
               private authService: AuthService ) { }

  register() {
    const { name, email, password } = this.myRegisterForm.value;
    
    this.authService.register( name, email, password )
      .subscribe( valid => {
        if( valid === true ) {
          this.router.navigateByUrl('/dashboard')
        } else {
          Swal.fire('Error', valid, 'error');
        }
      } );
    //this.router.navigateByUrl('/dashboard');
  }

}
