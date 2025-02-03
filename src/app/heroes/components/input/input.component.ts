import { Component, Input, OnInit } from '@angular/core';
import { HeroesServices } from '../../services/heroes.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/Hero.interface';

@Component({
  selector: 'hero-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  constructor(private heroesService: HeroesServices) {}

  @Input() type!: string;

  public heroes: Hero[] = [];
  public count: number = 0;

  public searchInput = new FormControl('');
  private searchTerm = new Subject<string>();

  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(
        debounceTime(300),
        // distinctUntilChanged Se usa para no hacer búsquedas constantes
        distinctUntilChanged()
      )
      .subscribe((term) => {
        this.heroesService.searchHeroes(term!);
      });

    this.heroesService.count$.subscribe((count) => {
      this.count = count;
    });
    this.heroesService.heroes$.subscribe((heroes) => {
      this.heroes = heroes;
    });
  }

  searchHero(term?: string): void {
    if (!term) {
      return;
    }
    this.searchTerm.next(term);
  }
}
