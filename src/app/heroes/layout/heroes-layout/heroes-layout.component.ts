import { Component, OnInit } from '@angular/core';
import { FavHeroesService } from '../../services/fav-heroes.service';

@Component({
  selector: 'heroes-layout',
  templateUrl: './heroes-layout.component.html',
  styleUrls: ['./heroes-layout.component.css'],
})
export class HeroesLayoutComponent implements OnInit {
  public favCount: number = 0;
  constructor(private favHeroesService: FavHeroesService) {}

  ngOnInit(): void {
    this.favHeroesService.favCount$.subscribe((count) => {
      this.favCount = count;
    });
  }
}
