import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserModel } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

const baseUrl = environment.url_base;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user?:UserModel;

  constructor(
    private router:Router,
    private http:HttpClient
  ) { }

  get getToken() {
    return localStorage.getItem(`token`) || ``;
  }

  get getHeaders() {
    return {
      headers:{
        token: this.getToken
      }
    }
  }

  loginUser(data:AuthService) {
    return this.http.post(`${baseUrl}/auth/`, data).pipe(
      tap((res:any) => {
        localStorage.setItem(`token`, res.msg.token);
      }),
    );
  }
  
  reNewToken() {
    return this.http.get(`${baseUrl}/auth/renew/`, this.getHeaders).pipe(
      map((res:any) => {
        const { msg } = res;
        const { id, user, role } = msg.data;

        localStorage.setItem(`token`, msg.token);
        this.user = new UserModel(id, user, role);
        return true;
      }),
      catchError((err:any)=> of(false)),
    );
  }
  
  createUser(data:AuthService) {
    return this.http.post(`${baseUrl}/users/`, data).pipe(
      tap((res:any) => {
        localStorage.setItem(`token`, res.msg.token);
      }),
    )
  }
  
  logOutUser() {
    this.router.navigateByUrl(`/login`);
    localStorage.removeItem(`token`);
  }
  
}
