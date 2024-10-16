import { Injectable } from '@angular/core';
import { CanActivate, CanMatch, ActivatedRouteSnapshot, RouterStateSnapshot, Route, UrlSegment, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanMatch {

  constructor(
    private authSrv: AuthService,
    private router: Router,
  ) { }

  private checkAuthStatus(): Observable<boolean> {
    return this.authSrv.checkAuhtentication()
      .pipe(
        tap((isAuthenticated) => console.log('isAuthenticated', isAuthenticated)),
        tap((isAuthenticated) => {
          if(!isAuthenticated){ this.router.navigate(['/auth/login']); }
        }),
      )
  }

  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    return this.checkAuthStatus();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.checkAuthStatus();
  }

}
