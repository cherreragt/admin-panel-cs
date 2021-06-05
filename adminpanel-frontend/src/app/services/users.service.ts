import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserInterface } from '../models/user.model';

const base_url = environment.url_base;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

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

  constructor(private http:HttpClient) { }

  getAllUsers() {
    return this.http.get(`${base_url}/users/`, this.getHeaders);
  }

  deleteCurrentUser(id:number) {
    return this.http.delete(`${base_url}/users/?id=${id}`, this.getHeaders);
  }

  updateCurrentUser(id:number, user:UserInterface) {
    return this.http.put(`${base_url}/users/?id=${id}`, user, this.getHeaders);
  }

  postUser(user:UserInterface) {
    return this.http.post(`${base_url}/users/`, user, this.getHeaders);
  }
}
