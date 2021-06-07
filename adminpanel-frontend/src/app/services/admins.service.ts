import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AdminInterface } from '../models/admins.model';

const base_url = environment.url_base;

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  constructor(private http:HttpClient) { }

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

  getAdmin(fk_ServerId:number) {
    return this.http.get(`${base_url}/admins/?fk_ServerId=${fk_ServerId}`, this.getHeaders);
  }

  deleteAdmin(id:number) {
    return this.http.delete(`${base_url}/admins/?id=${id}`, this.getHeaders);
  }

  updateAdmin(id:number, fk_ServerId:number, admin:AdminInterface) {
    return this.http.put(`${base_url}/admins/?id=${id}&fk_ServerId=${fk_ServerId}`, admin, this.getHeaders);
  }

  createAdmin(admin:AdminInterface) {
    return this.http.post(`${base_url}/admins/`, admin, this.getHeaders);
  }
}
