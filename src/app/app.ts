import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Home } from './home/home';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('mydex');
}
