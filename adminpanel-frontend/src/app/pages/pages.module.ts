import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ServersComponent } from './servers/servers.component';
import { AdminsComponent } from './admins/admins.component';
import { UsersComponent } from './users/users.component';
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersPPipe } from '../pipes/users-p.pipe';


@NgModule({
  declarations: [
    PagesComponent, 
    HomeComponent, 
    ServersComponent, 
    AdminsComponent, 
    UsersComponent,
    UsersPPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ChartsModule,
    ReactiveFormsModule,
    
  ]
})
export class PagesModule { }
