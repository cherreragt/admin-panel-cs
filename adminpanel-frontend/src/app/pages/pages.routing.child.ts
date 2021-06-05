import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ServersComponent } from './servers/servers.component';
import { AdminsComponent } from './admins/admins.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path:'', component:HomeComponent, data:{title:'home'} },
  { path: 'servers', component:ServersComponent, data:{title:'servers'} },
  { path: 'admins', component:AdminsComponent, data:{title:'admins'} },
  { path: 'users', component:UsersComponent, data:{title:'users'} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesChildRoutingModule {}
