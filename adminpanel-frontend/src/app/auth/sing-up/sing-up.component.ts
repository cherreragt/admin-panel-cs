import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {

  signUpForm:FormGroup;
  isTypePass:boolean = true;

  constructor(
    private fb:FormBuilder,
    private userService:AuthService,
    private router:Router
    ) { 
    this.signUpForm = fb.group({
      user: ['', [ Validators.required, Validators.minLength(3) ]],
      password: ['', [ Validators.required, Validators.minLength(3) ]]
    });
  }
  
  ngOnInit(): void {
  }

  get invalidUser(){ return this.signUpForm.controls.user.invalid && this.signUpForm.controls.user.touched }
  get invalidPass(){ return this.signUpForm.controls.password.invalid && this.signUpForm.controls.password.touched }
  get invalidForm(){ return this.signUpForm.invalid && this.signUpForm.controls.user.touched && this.signUpForm.controls.password.touched }
  
  get validUser(){ return this.signUpForm.controls.user.valid && this.signUpForm.controls.user.touched }
  get validPassword(){ return this.signUpForm.controls.password.valid && this.signUpForm.controls.password.touched }
  
  register(){
    this.signUpForm.markAllAsTouched();
    if(this.signUpForm.invalid){ return; }

  const register = this.userService.createUser(this.signUpForm.value).subscribe((responses:any) =>{
      Swal.fire(':)', `Entraras al panel en segundos..`, 'success');
      setTimeout(()=>{
        this.router.navigateByUrl(`/dashboard`);
        register.unsubscribe();
      }, 3000);
      
    }, (err) => {
      Swal.fire('Ocurrio un error :(', `Error: ${err.error.msg}`, 'error');
    });
  }


}
