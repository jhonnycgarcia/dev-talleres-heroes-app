import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent {

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
    private heroesSrv: HeroesService
  ) { }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero
    return hero;
  }

  onSubmit(): void {
    if(!this.heroForm.valid){ return; }

    if(this.currentHero.id){
      this.heroesSrv.updateHero(this.currentHero)
        .subscribe((hero) => {
          /** TODO: mostrar snackbar */
        });
      return;
    }

    this.heroesSrv.addHero(this.currentHero)
      .subscribe((hero) => {
        /** TODO: mostrar snackbar y navegar a /heroes/edit/{hero.id} */
      });
  }

}
