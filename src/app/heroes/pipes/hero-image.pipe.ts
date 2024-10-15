import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interfaces';

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {

  private noImageUrl = 'assets/heroes/no-image.png';

  transform(hero: Hero): string {
    if(!hero.id && !hero.alt_img){ return this.noImageUrl; }

    /** En caso de tener imagen alternativa con URL */
    if(hero.alt_img){ return hero.alt_img; }

    return 'assets/heroes/' + hero.id + '.jpg';
  }

}
