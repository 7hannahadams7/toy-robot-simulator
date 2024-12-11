import { Component } from '@angular/core';
import { GameBoardComponent } from './game-board/game-board.component';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [GameBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'toy-robot-game';
}
