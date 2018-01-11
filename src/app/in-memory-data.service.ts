import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable()
export class InMemoryDataService implements InMemoryDbService{

  constructor() { }

    createDb() {
        const heroes = [
            { id: 11, name: 'Mr. Nice' },
            { id: 12, name: 'Narco' },
            { id: 13, name: 'Bombasto' },
            { id: 14, name: 'Venik' },
            { id: 15, name: 'Bolt' },
            { id: 16, name: 'Magma' },
            { id: 17, name: 'Tomato' },
            { id: 18, name: 'Magneta' },
            { id: 19, name: 'Tornado' },
            { id: 20, name: 'Ra' }
        ];

        return { heroes };
    }
}
