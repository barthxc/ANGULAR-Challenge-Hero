import { Component, OnInit, signal } from '@angular/core';
import { HeroesServices } from '../../services/heroes.service';
import { Hero } from '../../interfaces/Hero.interface';

@Component({
  selector: 'heroes-list-page',
  templateUrl: './heroes-list-page.component.html',
  styleUrls: ['./heroes-list-page.component.css'],
})
export class HeroesListPageComponent implements OnInit {
  constructor(private heroesService: HeroesServices) {}

  public heroes: Hero[] = [];
  public favHeroes: Hero[] = [];
  public isLoading: boolean = false;
  //Other component
  public count: number = 0;

  ngOnInit(): void {
    //Ejecuto mi petición
    this.heroesService.getHeroes();

    //Me subscribo a mis befaivorSubject
    this.heroesService.heroes$.subscribe((heroes) => {
      this.heroes = heroes;
    });

    this.heroesService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }
}
