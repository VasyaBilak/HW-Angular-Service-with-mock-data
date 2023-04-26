import { Injectable } from '@angular/core';
import { IUsers } from '../../interfaces/users/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users: Array<IUsers> = [
    {
      id: 1,
      username: 'admin',
      email: 'admin.vb@gmail.com',
      password: '1111',
    },
  ];

  constructor() {}

  getUsers() {
    return this.users;
  }

  addUser(user: IUsers): void {
    this.users.push(user);
  }
}
