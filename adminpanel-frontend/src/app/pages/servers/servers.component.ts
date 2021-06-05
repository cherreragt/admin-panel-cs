import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, tap } from 'rxjs/operators';
import { ServerInterface, ServerModel } from 'src/app/models/server.model';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  
  modal:boolean = false;
  server:any[] = [];
  modalCurrentEdit: boolean = false;
  currentServer?:ServerInterface;
  startPag:number = 0;
  endPag:number = 5;
  cargando:boolean = true;

  FormServer:FormGroup;

  constructor(private servers:ServerService, private fb:FormBuilder) { 
    this.FormServer = this.fb.group({
      nameServer:[ '', [ Validators.required, Validators.minLength(8) ] ],
      ipServer: [ '', [ Validators.required, Validators.minLength(8) ] ],
    });
  }

  ngOnInit(): void {
    this.loadServers();
  }

  editServer(data:any) {
    this.currentServer = data;
    const { nameServer, ipServer } = data;
    this.modalCurrentEdit = true;

    this.FormServer.setValue({nameServer, ipServer});
    this.showModal();
  }

  loadServers() {
    this.servers.getServers().pipe(
      tap((res) =>{
        this.cargando = true;
      }),
      delay(1000),
    ).subscribe(({msg}:any) => {
      this.server = msg;
      this.cargando = false;
    }, (err) => {
      console.log(err);
    });
  }
  
  delCurrentServer(id:number) {
    this.servers.deleteServer(id).subscribe((err) => {
      this.loadServers();
    }, (err) => {
      console.log(err);
    });
  }
  updateCurrentServer() {
    if (this.FormServer.invalid) {
      return;
    }
    
    const id  = this.currentServer?.id || 0;

    this.servers.updateServer(id, this.FormServer.value).subscribe((responses) => {
      this.closeModal();
      this.loadServers();
    }, (err) => {
      console.log(err);
    });
  }

  showModal() {
    this.modal = true;
  }

  closeModal() {
    this.modal = false;
    this.modalCurrentEdit = false;
  }

  AddServer() {
    if (this.FormServer.invalid) {
      return;
    }
    this.servers.createServer(this.FormServer.value).subscribe((responses) => {
      this.closeModal();
      this.loadServers();
    }, (err) => {
      console.log(err);
    });
    
  }

  nextPag() {
    if (this.server.length < this.endPag) {
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
