import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;
  private user?: User;

  constructor(
    private http: HttpClient
  ) { }

  get currentUser(): User | undefined {
    if(!this.user) { return undefined; }
    return structuredClone(this.user);
  }

  login(usuario: string, password: string): Observable<User>   {
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap((user) => this.user = user),
        tap((user) => localStorage.setItem('token', 'asdasdasd21easdferwo23mrfscsa') ),
      );
  }

  checkAuhtentication(): Observable<boolean> | boolean {
    if(!localStorage.getItem('token')){ return false; }

    const token = localStorage.getItem('token');

    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap((user) => this.user = user),
        map((user) => !!user),
        catchError(() => of(false)),
      );
  }

  logout(): void {
    this.user = undefined;
    localStorage.removeItem('token');
  }

}
