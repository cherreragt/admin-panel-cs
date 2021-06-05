import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServerModel } from '../models/server.model';

const base_url = environment.url_base;

@Injectable({
  providedIn: 'root'
})
export class ServerService {

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

  getServers() {
    return this.http.get(`${base_url}/servers/`, this.getHeaders);
  }

  deleteServer(id:number) {
    return this.http.delete(`${base_url}/servers/?id=${id}`, this.getHeaders);
  }

  updateServer(id:number, server:ServerModel) {
    return this.http.put(`${base_url}/servers/?id=${id}`, server, this.getHeaders);
  }

  createServer(server:ServerModel) {
    return this.http.post(`${base_url}/servers/`, server, this.getHeaders);
  }
}
