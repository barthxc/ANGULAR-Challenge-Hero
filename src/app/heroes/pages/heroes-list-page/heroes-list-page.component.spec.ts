import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesListPageComponent } from './heroes-list-page.component';

describe('HeroesListPageComponent', () => {
  let component: HeroesListPageComponent;
  let fixture: ComponentFixture<HeroesListPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroesListPageComponent]
    });
    fixture = TestBed.createComponent(HeroesListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
