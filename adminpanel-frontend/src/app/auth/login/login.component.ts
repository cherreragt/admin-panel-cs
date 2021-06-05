import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  isTypePass:boolean = true;

  constructor(private fb:FormBuilder, private router:Router, private auth:AuthService) { 
    this.loginForm = fb.group({
      user: ['', [ Validators.required, Validators.minLength(3) ]],
      password: ['', [ Validators.required, Validators.minLength(6) ]]
    });
  }
  
  ngOnInit(): void {
  }

  get invalidUser(){ return this.loginForm.controls.user.invalid && this.loginForm.controls.user.touched }
  get invalidPass(){ return this.loginForm.controls.password.invalid && this.loginForm.controls.password.touched }
  get invalidForm(){ return this.loginForm.invalid && this.loginForm.controls.user.touched && this.loginForm.controls.password.touched }
  
  get validUser(){ return this.loginForm.controls.user.valid && this.loginForm.controls.user.touched }
  get validPass(){ return this.loginForm.controls.password.valid && this.loginForm.controls.password.touched }
  
  login(){
    this.loginForm.markAllAsTouched();
    if(this.loginForm.invalid){ return; }

    
    const log = this.auth.loginUser(this.loginForm.value).subscribe((responses) => {
      console.log(responses);
      this.router.navigateByUrl('/dashboard');
      log.unsubscribe();
    }, (err) => {
      console.log(err)
    })
    
  }

}
