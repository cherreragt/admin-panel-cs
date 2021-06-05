import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [
  { path: 'dashboard', component:PagesComponent, 
    canActivate:[AuthGuard],
    canLoad:[AuthGuard],
    loadChildren: () => import('./pages.routing.child').then(m => m.PagesChildRoutingModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
