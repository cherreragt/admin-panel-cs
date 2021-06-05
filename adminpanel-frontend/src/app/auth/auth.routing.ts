import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SingUpComponent } from './sing-up/sing-up.component';
import { LoginComponent } from './login/login.component';
import { LogedGuard } from '../guards/loged.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate:[LogedGuard],
  canLoad:[LogedGuard], },
  { path: 'signup', component: SingUpComponent, canActivate:[LogedGuard],
  canLoad:[LogedGuard], },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
