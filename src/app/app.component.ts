import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'HW-06';
  public name!: string;

  getMessage(data: string): void {
    this.name = data;
  }
}
