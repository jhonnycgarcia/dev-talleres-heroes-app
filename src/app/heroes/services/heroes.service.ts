import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interfaces';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError(() => of(undefined))
      );
  }

  getSuggestions(query: string): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`)
      .pipe(
        catchError(() => of([]))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }

  updateHero(hero: Partial<Hero>): Observable<Hero> {
    if(!hero.id){ throw new Error('Hero id is required'); }
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  deleteHeroById(id: string): Observable<boolean> {
    if(!id){ throw new Error('Hero id is required'); }
    return this.http.delete(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError(() => of(false)),
        map(() => true)
      )
  }

}
