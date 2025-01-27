import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { HeroesLayoutComponent } from './layout/heroes-layout/heroes-layout.component';
import { FavComponent } from './components/fav/fav.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { HeroesListPageComponent } from './pages/heroes-list-page/heroes-list-page.component';

@NgModule({
  declarations: [
    Error404PageComponent,
    HeroesLayoutComponent,
    FavComponent,
    HeroPageComponent,
    HeroesListPageComponent,
  ],
  imports: [CommonModule, HeroesRoutingModule],
})
export class HeroesModule {}
