import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { BehaviorSubject } from 'rxjs';

import { Hero } from './hero';


export const CLASSES: string[] = [
  'Warrior',
  'Mage',
  'Priest',
  'Hunter',
  'Rogue',
  'Shaman',
  'Druid',
  'Death knight',
  'Warlock',
  'Paladin',
  'Monk',
];

export const RACES: string[] = [
  'Human',
  'Orc',
  'Night Elv',
  'Blood Elv',
  'Dwarf',
  'Troll',
  'Gnome',
  'Undead',
  'Tauren',
  'Drenei',
  'Pandaren',
];


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {


  createDb() {
    const heroes = [
      { id: 1,  name: 'Dr Nice',   class: 'Warrior',  race: 'Human',      level: 99 },
      { id: 2,  name: 'Narco',     class: 'Warlock',  race: 'Undead',     level: 95 },
      { id: 3,  name: 'Bombasto',  class: 'Priest',   race: 'Undead',     level: 90 },
      { id: 4,  name: 'Celeritas', class: 'Paladin',  race: 'Blood Elv',  level: 90 },
      { id: 5,  name: 'Magneta',   class: 'Rogue',    race: 'Gnome',      level: 80 },
      { id: 6,  name: 'RubberMan', class: 'Shaman',   race: 'Drenei',     level: 50 },
      { id: 7,  name: 'Dynama',    class: 'Driud',    race: 'Tauren',     level: 1 },
      { id: 8,  name: 'Dr IQ',     class: 'Hunter',   race: 'Dwarf',      level: 20 },
      { id: 9,  name: 'Magma',     class: 'Monk',     race: 'Pandaren',   level: 25 },
      { id: 10, name: 'Tornado',   class: 'Death knight', race: 'Night Elv', level: 75 }
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (1).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 1;
  }


  constructor() { }
}
