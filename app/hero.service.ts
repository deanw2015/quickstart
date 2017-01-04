import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService 
{

    private headers = new Headers({'content-type': 'application/json'});
    private heroesUrl = 'api/heroes'; // URL to web api

    constructor(private http: Http) { }

    create(name: string): Promise<Hero> {
        return this.http.post(this.heroesUrl, JSON.stringify({ name: name}), { headers: this.headers})
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    getHeroes() : Promise<Hero[]> {
        return this.http
            .get(this.heroesUrl)
                .toPromise()
                .then(response => response.json().data as Hero[])
                .catch(this.handleError);        
    }

    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise(resolve => {
            // Simulate server latency with 2 second delay
            setTimeout(() => resolve(this.getHeroes()), 300);
        });
    }

    getHero(id: number): Promise<Hero> {
        return this.http
            .get(`${this.heroesUrl}/${id}`)
                .toPromise()
                .then(response => response.json().data as Hero)
                .catch(this.handleError);
    }

    updateHero(hero: Hero) : Promise<Hero> {

        const url = `${this.heroesUrl}/${hero.id}`;

        return this.http
            .put(url, JSON.stringify(hero), { headers: this.headers })
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.heroesUrl}/${id}`;
        
        return this.http
            .delete(url, { headers: this.headers })
            .toPromise()
            .then(( )=> null)
            .catch(this.handleError);
    }

    handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message ||  error);
    }
}