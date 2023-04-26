import {
  Component,
  DoCheck,
  Output,
  EventEmitter,
} from '@angular/core';
import { UsersService } from '../../../shared/services/users/users.service';
import { IUsers } from '../../../shared/interfaces/users/users.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements DoCheck {
  public users: Array<IUsers> = [];
  public signUp: boolean = false;
  public username!: string;
  public email!: string;
  public password!: string;
  public formData: Array<Object> = [];

  @Output() fromChild = new EventEmitter<Array<Object>>();

  constructor(private UsersService: UsersService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  ngDoCheck(): void {
    this.checkForm();
  }

  ngOnChanges(): void {
    this.prepareForSend();
  }

  prepareForSend(): void {
    this.formData.push({
      email: this.email,
      password: this.password,
    });
  }

  sendMessage(): void {
    this.prepareForSend();
    this.fromChild.emit(this.formData);
    this.resetForm();
    this.formData = [];
  }

  getUsers(): void {
    this.users = this.UsersService.getUsers();
  }

  checkForm(): void {
    if (
      this.username &&
      this.username.trim() !== '' &&
      this.email &&
      this.email.trim() !== '' &&
      this.password &&
      this.password.trim() !== ''
    ) {
      this.signUp = true;
    } else {
      this.signUp = false;
    }

    this.users.forEach((user) => {
      if (user.username === this.username && user.password === this.password)
        this.signUp = false;
    });
  }

  addUser(): void {
    const newUser = {
      id: 1,
      username: this.username,
      email: this.email,
      password: this.password,
    };

    if (this.users.length > 0) {
      const id = this.users.slice(-1)[0].id;
      newUser.id = id + 1;
    }

    this.UsersService.addUser(newUser);
    this.sendMessage();
    this.resetForm();
  }

  resetForm(): void {
    this.username = '';
    this.email = '';
    this.password = '';
  }
}
