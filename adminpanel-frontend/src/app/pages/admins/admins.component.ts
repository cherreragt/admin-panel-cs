import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminsService } from 'src/app/services/admins.service';
import { ServerService } from 'src/app/services/server.service';

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

  FormAdmin:FormGroup;

  constructor(private adminService:AdminsService, private serverService:ServerService, private fb:FormBuilder) { 

    this.FormAdmin = this.fb.group({
      fk_ServerId: ['server', [Validators.required]],
      authid: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
      flags: ['', [Validators.required]],
      vencimiento: [new Date(), [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadServers();
  }

  loadServers() {
    this.serverService.getServers().subscribe(({msg}:any) => {
      this.servers = msg;
      if (msg.length > 0) {
        this.loadAllAdmins(msg[0].id);
      }
      this.cargando = false;
    }, (err) =>{
      console.log(err);
    });
  }

  changeServer(event:any) {
    this.loadAllAdmins(event.target.value);
  }

  loadAllAdmins(id:number) {

    this.adminService.getAdmin(id).subscribe(({msg}:any) => {
      this.admins = msg;
      this.cargando = false;
    }, (err) =>{
      console.log(err);
    });
  }

  addAdmin() {
    if (this.FormAdmin.invalid) {
      return;
    }

    this.adminService.createAdmin(this.FormAdmin.value).subscribe((responses) => {
      this.closeModal();
      this.loadServers();
    }, (err) =>{
      console.log(err);
    });
  }
  showModal() {
    this.modal = true;
  }
  closeModal() {
    this.modal = false;
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
