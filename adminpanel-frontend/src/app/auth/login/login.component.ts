import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  isTypePass:boolean = true;

  constructor(private fb:FormBuilder) { 
    this.loginForm = fb.group({
      user: ['', [ Validators.required, Validators.minLength(3) ]],
      pass: ['', [ Validators.required, Validators.minLength(6) ]]
    });
  }
  
  ngOnInit(): void {
  }

  get invalidUser(){ return this.loginForm.controls.user.invalid && this.loginForm.controls.user.touched }
  get invalidPass(){ return this.loginForm.controls.pass.invalid && this.loginForm.controls.pass.touched }
  get invalidForm(){ return this.loginForm.invalid && this.loginForm.controls.user.touched && this.loginForm.controls.pass.touched }
  
  get validUser(){ return this.loginForm.controls.user.valid && this.loginForm.controls.user.touched }
  get validPass(){ return this.loginForm.controls.pass.valid && this.loginForm.controls.pass.touched }
  
  login(){
    this.loginForm.markAllAsTouched();
    if(this.loginForm.invalid){ return; }

    console.log(this.loginForm.value);
  }

}
