import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class HeroService {
    private heroesUrl = 'api/heroes';
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService) { }

    getHeroes(): Observable<Hero[]> {
        this.log('fetched heroes');
        return this.http.get<Hero[]>(this.heroesUrl)
            .pipe(
                tap(_ => this.log('fetched heroes')),
                catchError(this.handleError('getHeroes', []))
            );
    }

    getHero(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        
        return this.http.get<Hero>(url)
            .pipe(
            tap(_ => this.log(`fetched hero with id ${id}`)),
                catchError(this.handleError<Hero>(`getHero id ${id}`))
            );
    }

    updateHero(hero: Hero): Observable<any> {
        return this.http.put(this.heroesUrl, hero, this.httpOptions)
            .pipe(
            tap(_ => this.log(`updated hero id ${hero.id}`)),
            catchError(this.handleError<any>('updateHero'))
            );
    }

    addHero(hero: Hero): Observable<Hero> {
        return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
            .pipe(
                tap(_ => this.log(`added hero with name ${hero.name}`)),
                catchError(this.handleError<Hero>('addHero'))
            );
    }

    deleteHero(hero: Hero | number): Observable<Hero> {
        const id = typeof hero === 'number' ? hero : hero.id;
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete<Hero>(url, this.httpOptions)
            .pipe(
            tap(_ => this.log(`deleted hero with id ${id}`)),
            catchError(this.handleError<Hero>('deleteHero'))
            );
    }

    searchHeroes(term: string): Observable<Hero[]> {
        if (!term.trim()) {
            return of([]);
        }

        return this.http.get<Hero[]>(`api/heroes/?name=${term}`)
            .pipe(
                tap(_ => this.log(`found heroes matching "${term}"`)),
                catchError(this.handleError<Hero[]>('searchHeroes', []))
            );
    }

    log(message: string): void {
        this.messageService.add('HeroService: ' + message);
    }

    private handleError<T>(operation = 'operation', defaultResult?: T) {
        return (error: any): Observable<T> => {
            console.error(error);

            this.log(`${operation} failed: ${error.message}`);

            return of(defaultResult as T);
        }
    }
}
