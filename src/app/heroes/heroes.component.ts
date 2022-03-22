import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { MatTable } from '@angular/material/table';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { CLASSES, RACES } from '../in-memory-data.service';
import { InMemoryDataService } from '../in-memory-data.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {

  @ViewChild(MatTable) table!: MatTable<Hero>;

  displayedColumns: string[] = ['id', 'name', 'class', 'race', 'level', 'delete']

  heroes: Hero[] = [];

  classes: string[] = CLASSES;
  races: string[] = RACES;

  constructor(
    private heroService: HeroService,) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }
/* 
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
        this.table.renderRows();
      });   
    
  } */

  delete(hero: Hero): void {
    const result = confirm('Do you realy want delete it?')
    if(result) {
      this.heroes = this.heroes.filter(h => h !== hero);
      this.heroService.deleteHero(hero.id).subscribe();
    }
  }
}