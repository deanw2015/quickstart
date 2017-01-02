import { Injectable } from '@angular/core';
import { HEROES } from './mock-heros';
import { Hero } from './hero';

@Injectable()
export class HeroService 
{
    getHeroes() : Promise<Hero[]> {
        return Promise.resolve(HEROES);
    }

    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise(resolve => {
                // Simulate server latency with 2 second delay
                setTimeout(() => resolve(this.getHeroes()), 300);
        });
    }
}