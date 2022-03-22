import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { CLASSES, RACES } from '../in-memory-data.service';
import { InMemoryDataService } from '../in-memory-data.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {

  hero: Hero | undefined;
  heroes: Hero[] = [];
  classes: string[] = CLASSES;
  races: string[] = RACES;
  update!: boolean;
  

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private memoryDataService: InMemoryDataService,
    private message: MessageService,
  ) {}

  updatePage!: boolean;

  ngOnInit(): void {
    this.getHero();
    this.setUpdate();
    this.getHeroes();
  }

  private log(msg: string) {
    this.message.add(`HeroesComponent: ${msg}`)
  }

  setUpdate(): void {
    if(this.route.snapshot.routeConfig?.path === 'hero/:id') {
      this.update = true;
    } else if (this.route.snapshot.routeConfig?.path === 'new') {
      this.update = false;
    }
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  add(name: string, cls: string, rac: string, lvl: string) {

    if(!name || Number(lvl) < 0 || Number(lvl) > 100) {
      this.log('Wrong values. You enter empty hero name or level low than 1 or big than 100');
      return;
    }

    const newHero: Hero = {
      id: this.memoryDataService.genId(this.heroes),
      name,
      class: cls,
      race: rac,
      level: Number(lvl),
    };

    this.heroService.addHero(newHero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });   
    
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
    }
  }
}