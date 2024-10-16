import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { pipe, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit {

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alt_img: new FormControl(''),
  })

  public publishers= [
    { id: 'DC Comics', name: 'DC - Comics' },
    { id: 'Marvel Comics', name: 'Marvel - Comics' },
  ];

  constructor(
    private heroesSrv: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    if(!this.router.url.includes('edit')){ return; }

    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.heroesSrv.getHeroById(id))
      )
      .subscribe((hero) => {
        if(!hero){ return this.router.navigate(['/heroes/list']); }
        return this.heroForm.reset(hero);
      });
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero
    return hero;
  }

  onSubmit(): void {
    if(!this.heroForm.valid){ return; }

    if(this.currentHero.id){
      this.heroesSrv.updateHero(this.currentHero)
        .subscribe((hero) => {
          this.showSnackBar(`${hero.superhero} actualizado exitosamente`);
        });
      return;
    }

    this.heroesSrv.addHero(this.currentHero)
      .subscribe((hero) => {
        this.router.navigate(['/heroes/edit', hero.id]);
        this.showSnackBar(`${hero.superhero} agregado exitosamente`);
      });
  }

  showSnackBar(message: string): void {
    this.snackBar.open(
      message,
      'done',
      {
        duration: 2500,
      }
    );
  }

}
