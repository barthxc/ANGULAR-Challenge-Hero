import { FavHeroesService } from './../../services/fav-heroes.service';
import { Component, OnInit } from '@angular/core';
import { HeroesServices } from '../../services/heroes.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/Hero.interface';
import { ComicsData } from '../../interfaces/Comics.interface';

@Component({
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.css'],
})
export class HeroPageComponent implements OnInit {
  public hero!: Hero;
  public favHeroes: Hero[] = [];
  public isLoading: boolean = false;
  public comicsData: ComicsData[] = [];
  public isFav: boolean = false;

  constructor(
    private heroesService: HeroesServices,
    private favHeroesService: FavHeroesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.heroesService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });

    // switchMap devuelve otro observable y ejecuta el primero, así que con esto utilizo 2 peticiones asincronas simultáneas
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroById(id)),
        switchMap((hero) => {
          this.hero = hero;
          return this.heroesService.getComics(hero.comics.collectionURI);
        })
      )
      .subscribe((comics) => {
        this.comicsData = comics;
      });
    //TODO: ERROR TypeError: Cannot read properties of undefined (reading 'id') ⬇

    this.favHeroesService.favHeroes$.subscribe((favHeroes) => {
      this.isFav = favHeroes.some((favHero) => favHero.id === this.hero.id);
    });
  }

  //TODO REFACTOR entra un heroresponse , void, structuring y lo controlo en el servicio
  clickHero() {
    const { id, name, thumbnail } = this.hero;
    const favHero = { id, name, thumbnail };
    this.favHeroesService.toggleFavHero(favHero);
  }
}
