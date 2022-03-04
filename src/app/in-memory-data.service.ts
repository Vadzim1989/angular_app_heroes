import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Hero } from './hero';


const classes = new Map([
  ['0', 'warrior'],
  ['1', 'mage'],
  ['2', 'priest'],
  ['3', 'hunter'],
  ['4', 'rogue'],
  ['5', 'shaman'],
  ['6', 'druid'],
  ['7', 'death knight'],
  ['8', 'warlock'],
  ['9', 'paladin'],
  ['10', 'monk']
])


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1,  name: 'Dr Nice',   class: classes.get(String(Math.floor(Math.random() * 11))) },
      { id: 2,  name: 'Narco',     class: classes.get(String(Math.floor(Math.random() * 11))) },
      { id: 3,  name: 'Bombasto',  class: classes.get(String(Math.floor(Math.random() * 11))) },
      { id: 4,  name: 'Celeritas', class: classes.get(String(Math.floor(Math.random() * 11))) },
      { id: 5,  name: 'Magneta',   class: classes.get(String(Math.floor(Math.random() * 11))) },
      { id: 6,  name: 'RubberMan', class: classes.get(String(Math.floor(Math.random() * 11))) },
      { id: 7,  name: 'Dynama',    class: classes.get(String(Math.floor(Math.random() * 11))) },
      { id: 8,  name: 'Dr IQ',     class: classes.get(String(Math.floor(Math.random() * 11))) },
      { id: 9,  name: 'Magma',     class: classes.get(String(Math.floor(Math.random() * 11))) },
      { id: 10, name: 'Tornado',   class: classes.get(String(Math.floor(Math.random() * 11))) }
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
