import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  modal:boolean = false;
  users:any[] = [];
  startPag:number = 0;
  endPag:number = 5;
  FormUser:FormGroup;

  constructor(private userService:UsersService, private fb:FormBuilder) { 
    this.FormUser = this.fb.group({
      user: ['' , [Validators.required, Validators.minLength(5)]],
      role: [null , [Validators.required]],
      password: ['' , [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit(): void {
    this.loadAllUsers();
  }

  createUser() {
    if (this.FormUser.invalid) {
      return;
    }
    
    //activar role en backend
    this.userService.postUser(this.FormUser.value).subscribe((responses) => {
      this.closeModal();
      this.loadAllUsers();
      console.log('object')
    }, (err) => {
      console.log(err);
      Swal.fire('Ocurrio un error :(', `Error: ${err.error.msg}`, 'error');
    });
  }

  loadAllUsers() {
    this.userService.getAllUsers().subscribe(({msg}:any) =>{
      this.users = msg;
    }, (err) => {
      console.log(err);
      Swal.fire('Ocurrio un error :(', `Error: ${err.error.msg}`, 'error');
    })
  }

  deleteUser(id:number) {
    this.userService.deleteCurrentUser(id).subscribe((res) => {
      this.loadAllUsers();
    }, (err) => {
      console.log(err);
      Swal.fire('Ocurrio un error :(', `Error: ${err.error.msg}`, 'error');
    });
  }

  showModal() {
    this.modal = true;
  }
  closeModal() {
    this.modal = false;
  }

  nextPag() {
    if (this.users.length < this.endPag) {
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
