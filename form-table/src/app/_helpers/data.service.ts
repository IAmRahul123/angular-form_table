import { User } from './user.interface';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
@Injectable({
  providedIn: 'root',
})
export class DataService implements InMemoryDbService {
  constructor() {}

  createDb() {
    let users: User[] = [
      {
        id: 1,
        title: 'Mr',
        firstName: 'Aditya',
        lastName: 'Rahul',
        email: 'test@gmail.com',
        dob: '2000-05-19',
        password: '123456',
        acceptTerms: true,
      },
      {
        id: 2,
        title: 'Mr',
        firstName: 'chandan',
        lastName: 'Singh',
        email: 'test2@gmail.com',
        dob: '2006-05-19',
        password: '123458',
        acceptTerms: true,
      },
    ];
    return { users };
  }
}
