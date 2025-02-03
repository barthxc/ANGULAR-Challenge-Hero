import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesLayoutComponent } from './layout/heroes-layout/heroes-layout.component';
import { HeroesListPageComponent } from './pages/heroes-list-page/heroes-list-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { FavoritesHeroesPageComponent } from './pages/favorites-heroes-page/favorites-heroes-page.component';

const routes: Routes = [
  {
    path: '',
    component: HeroesLayoutComponent,
    children: [
      {
        path: '',
        component: HeroesListPageComponent,
      },

      {
        path: 'favorites',
        component: FavoritesHeroesPageComponent,
      },
      {
        path: ':id',
        component: HeroPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
