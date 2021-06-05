import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  active:boolean = false;
  title:string = "";
  titleSub!: Subscription;
  user?:UserModel;

  constructor(private router:Router, private auth:AuthService) {
    this.titleSub = this.getTitle().subscribe((title)=>{
      this.title = title;
    });
    this.user = auth.user;
  }

  ngOnInit(): void {
    
  }

  getTitle(){
    return this.router.events.pipe(
      //verifica si es de ese tipo y la filtra
      filter((dat:any) => { 
        return dat instanceof ActivationEnd
      }),
      //de lo antes filtrado filtra el que first chield esta vacio
      filter( (evento:ActivationEnd) => { 
        return evento.snapshot.firstChild === null
      } ),
      //envia solo solo snapshot.data
      map( (evento:ActivationEnd) => { 
        return evento.snapshot.data.title
      } )
    );
  }

  logOut() {
    this.auth.logOutUser();
  }
}
