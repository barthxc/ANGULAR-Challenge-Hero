import { Component, Input } from '@angular/core';
import { Hero } from '../../interfaces/interfaces';

@Component({
  selector: 'card-hero',
  templateUrl: './card-hero.component.html',
  styleUrls: ['./card-hero.component.css'],
})
export class CardHeroComponent {
  @Input() hero!: Hero;

  clickHero() {
    console.log(this.hero.name);
    console.log(this.hero.id);
  }
}
