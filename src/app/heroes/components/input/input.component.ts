import { Component, OnInit } from '@angular/core';
import { HeroesServices } from '../../services/heroes.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'hero-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  constructor(private heroesService: HeroesServices) {}

  //TODO: Sacamos el resultado con un new FormControl mejor en vez de sacando el value pro defecto.

  public count: number = 0;

  private searchTerm = new Subject<string>();

  ngOnInit(): void {
    this.heroesService.count$.subscribe((count) => {
      this.count = count;
    });

    this.searchTerm
      .pipe(
        debounceTime(300),
        // distinctUntilChanged Se usa para no hacer búsquedas constantes
        distinctUntilChanged()
      )
      .subscribe((term) => {
        if (term.trim()) {
          this.heroesService.searchHeroes(term);
        }
      });
  }

  search(term?: string): void {
    if (!term) {
      return;
    }
    this.searchTerm.next(term);
  }
}
