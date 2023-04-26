import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public email!: string;
  public password!: string;
  public formData: Array<Object> = [];

  @Output() fromChild = new EventEmitter<Array<Object>>();

  constructor() {}
  ngOnInit(): void {}
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

  resetForm(): void {
    this.email = '';
    this.password = '';
  }
}
