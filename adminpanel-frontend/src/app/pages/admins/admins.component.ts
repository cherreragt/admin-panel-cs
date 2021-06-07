import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminsService } from 'src/app/services/admins.service';
import { ServerService } from 'src/app/services/server.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {

  modal:boolean = false;

  admins:any[] = [];
  servers:any[] = [];
  startPag:number = 0;
  endPag:number = 5;
  cargando:boolean = true;
  edit:boolean = false;
  editData:any = {};
  FormAdmin:FormGroup;
  idServer:number = 0;

  constructor(private adminService:AdminsService, private serverService:ServerService, private fb:FormBuilder) { 

    this.FormAdmin = this.fb.group({
      fk_ServerId: ['server', [Validators.required]],
      authid: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
      flags: ['', [Validators.required]],
      vencimiento: [new Date(), [Validators.required]],
      playername: ['', [Validators.required]],
      steam: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadServers();
  }
  changeServerId(event:any) {
    this.idServer = event.target.value;
  }
  loadServers() {
    this.serverService.getServers().subscribe(({msg}:any) => {
      this.servers = msg;
      if (msg.length > 0) {
        this.loadAllAdmins(msg[0].id);
        this.idServer = msg[0].id;
      }
      this.cargando = false;
    }, (err) =>{
      console.log(err);
      Swal.fire('Ocurrio un error :(', `Error: ${err.error.msg}`, 'error');
    });
  }
  update(data:any) {
    this.edit = true;
    this.showModal();
    this.editData = data;
    const { id, fk_UserId, createdAt, updatedAt, deletedAt, ...admin } = data;
    this.FormAdmin.setValue(admin);
  }

  updateCurrentServer() {
    if (this.FormAdmin.invalid) {
      return;
    }

    this.adminService.updateAdmin(this.editData.id, this.editData.fk_ServerId, this.FormAdmin.value).subscribe(()=>{
      this.closeModal();
      this.loadAllAdmins(this.idServer);
    }, (err) =>{
      console.log(err);
      Swal.fire('Ocurrio un error :(', `Error: ${err.error.msg}`, 'error');
    })
  }

  changeServer(event:any) {
    this.loadAllAdmins(event.target.value);
  }

  deleteCurrentAdmin(id:number) {
    this.adminService.deleteAdmin(id).subscribe((responses) => {
      this.loadServers();
    }, (err) =>{
      console.log(err);
      Swal.fire('Ocurrio un error :(', `Error: ${err.error.msg}`, 'error');
    })
  }

  loadAllAdmins(id:number) {
    this.adminService.getAdmin(id).subscribe(({msg}:any) => {
      this.admins = msg;
      this.cargando = false;
    }, (err) =>{
      console.log(err);
      Swal.fire('Ocurrio un error :(', `Error: ${err.error.msg}`, 'error');
    });
  }

  addAdmin() {
    if (this.FormAdmin.invalid) {
      return;
    }
    this.edit = true;
    this.adminService.createAdmin(this.FormAdmin.value).subscribe((responses) => {
      this.closeModal();
      this.loadServers();
    }, (err) =>{
      console.log(err);
      Swal.fire('Ocurrio un error :(', `Error: ${err.error.msg}`, 'error');
    });
  }
  showModal() {
    this.modal = true;
  }
  closeModal() {
    this.modal = false;
    this.edit = false;
  }

  nextPag() {
    if (this.admins.length < this.endPag) {
      return;
    }

    this.startPag += 5;
    this.endPag += 5;
  }

  previousPag() {
    if (this.startPag <= 5) {
      this.startPag = 0;
      this.endPag = 5;
      return;
    }
    this.startPag -= 5;
    this.endPag -= 5;
  }

}
