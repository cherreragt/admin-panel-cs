import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {

  signUpForm:FormGroup;
  isTypePass:boolean = true;

  constructor(private fb:FormBuilder) { 
    this.signUpForm = fb.group({
      user: ['', [ Validators.required, Validators.minLength(3) ]],
      pass: ['', [ Validators.required, Validators.minLength(6) ]]
    });
  }
  
  ngOnInit(): void {
  }

  get invalidUser(){ return this.signUpForm.controls.user.invalid && this.signUpForm.controls.user.touched }
  get invalidPass(){ return this.signUpForm.controls.pass.invalid && this.signUpForm.controls.pass.touched }
  get invalidForm(){ return this.signUpForm.invalid && this.signUpForm.controls.user.touched && this.signUpForm.controls.pass.touched }
  
  get validUser(){ return this.signUpForm.controls.user.valid && this.signUpForm.controls.user.touched }
  get validPass(){ return this.signUpForm.controls.pass.valid && this.signUpForm.controls.pass.touched }
  
  createUser(){
    this.signUpForm.markAllAsTouched();
    if(this.signUpForm.invalid){ return; }

    console.log(this.signUpForm.value);
  }


}
