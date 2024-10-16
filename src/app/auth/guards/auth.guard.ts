import { Injectable } from '@angular/core';
import { CanActivate, CanMatch, ActivatedRouteSnapshot, RouterStateSnapshot, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanMatch {

  constructor() { }

  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    console.log('canMatch');
    console.log({route, segments});
    // Implement your matching logic here
    return true; // or a condition based on matching logic
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    console.log('canActivate');
    console.log({route, state});
    // Implement your authentication logic here
    return true; // or a condition based on authentication logic
  }

}
