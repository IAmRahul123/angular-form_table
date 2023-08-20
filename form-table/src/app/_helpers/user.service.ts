import { User } from './user.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private BASE_API_PATH = 'http://localhost:4200/api/';

  constructor(private _httpService: HttpClient) {}

  getUsers() {
    return this._httpService.get(this.BASE_API_PATH + 'users');
  }

  getUserById(userId: number) {
    return this._httpService.get(`${this.BASE_API_PATH}users/${userId}`);
  }

  addUser(user: User) {
    return this._httpService.post(`${this.BASE_API_PATH}users`, user);
  }

  updateUser(user: User) {
    return this._httpService.put(`${this.BASE_API_PATH}users/${user.id}`, user);
  }

  deleteUser(userId: number) {
    return this._httpService.delete(`${this.BASE_API_PATH}users/${userId}`);
  }
}
