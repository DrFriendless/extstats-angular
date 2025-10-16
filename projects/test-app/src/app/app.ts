import { Component } from '@angular/core';

class Game {
  name: string;
  tooltip: string;
  n: number;

  constructor(name: string, n: number) {
    this.name = name;
    this.n = n;
    this.tooltip = name;
  }
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.scss'
})
export class App {
  rows: Game[] = [
    new Game("Ludo", 1234),
    new Game("Scrabble", 42),
    new Game("Domaine", 1987),
    new Game("Beowulf", 12),
    new Game("Caylus", 123),
  ];
}
