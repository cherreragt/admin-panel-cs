import { Injectable } from '@angular/core';
import { CanLoad, Route, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router, private auth:AuthService){ }
  
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.auth.reNewToken().pipe(
      tap((res:any) => {
        if(!res){
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.reNewToken().pipe(
      tap((res:any) => {
        if(!res){
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
