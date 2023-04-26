import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  DoCheck,
} from '@angular/core';
import { UsersService } from '../../shared/services/users/users.service';
import { IUsers } from '../../shared/interfaces/users/users.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, DoCheck {
  public message: any[] = [];
  public users: Array<IUsers> = [];
  public signIn: boolean = false;
  public username: string = '';

  constructor(private UsersService: UsersService) {}

  @Output() fromChild = new EventEmitter<string>();

  sendMessage(): void {
    this.fromChild.emit(this.username);
  }

  ngOnInit(): void {
    this.getUsers();
  }

  ngDoCheck(): void {
    this.sendMessage();
  }

  getMessage(data: Array<Object>): void {
    this.message = data;
    this.checkUser();
  }

  getUsers(): void {
    this.users = this.UsersService.getUsers();
  }

  checkUser(): void {
    this.users.forEach((user) => {
      this.message.forEach((signIn) => {
        if (user.email === signIn.email && user.password === signIn.password) {
          this.signIn = true;
          this.username = user.username;
        }
      });
    });
  }

  signOut(): void {
    this.signIn = false;
    this.username = '';
  }
}
