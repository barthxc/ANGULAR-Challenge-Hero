import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesLayoutComponent } from './layout/heroes-layout/heroes-layout.component';
import { HeroesListPageComponent } from './pages/heroes-list-page/heroes-list-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';

const routes: Routes = [
  {
    path: '',
    component: HeroesLayoutComponent,
    children: [
      {
        path: 'list',
        component: HeroesListPageComponent,
      },
      {
        path: ':id',
        component: HeroPageComponent,
      },
      {
        path: 'favorites',
        component: HeroPageComponent,
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
