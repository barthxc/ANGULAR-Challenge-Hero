import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { HeroesLayoutComponent } from './layout/heroes-layout/heroes-layout.component';
import { FavComponent } from './components/fav/fav.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { HeroesListPageComponent } from './pages/heroes-list-page/heroes-list-page.component';
import { InputComponent } from './components/input/input.component';
import { CardHeroComponent } from './components/card-hero/card-hero.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FavoritesHeroesPageComponent } from './pages/favorites-heroes-page/favorites-heroes-page.component';
import { ComicCardComponent } from './components/comic-card/comic-card.component';
import { FavInputComponent } from './components/fav-input/fav-input.component';

@NgModule({
  declarations: [
    Error404PageComponent,
    HeroesLayoutComponent,
    FavComponent,
    HeroPageComponent,
    HeroesListPageComponent,
    InputComponent,
    CardHeroComponent,
    LoadingComponent,
    FavoritesHeroesPageComponent,
    ComicCardComponent,
    FavInputComponent,
  ],
  imports: [CommonModule, HeroesRoutingModule, ReactiveFormsModule],
  exports: [LoadingComponent],
})
export class HeroesModule {}
