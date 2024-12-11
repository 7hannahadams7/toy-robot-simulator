// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-game-board',
//   imports: [],
//   templateUrl: './game-board.component.html',
//   styleUrl: './game-board.component.css'
// })
// export class GameBoardComponent {

// }
import { Component, OnInit } from '@angular/core';
import { RobotService } from '../robot.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule], // Add CommonModule here
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
})
export class GameBoardComponent implements OnInit {
  grid: number[][];
  robot: { x: number; y: number; direction: string } | null = null; // Robot starts as null
  report: string = 'Robot has not been placed.'; // Initialize with a default message
  showReport: boolean = false;

  constructor(private robotService: RobotService) {
    this.grid = Array(5)
      .fill(null)
      .map(() => Array(5).fill(null)); // Creates a 5x5 grid
  }

  ngOnInit() {
    this.updateRobotPosition(); // Initialize the robot's position
  }

  updateRobotPosition() {
    this.showReport = false
    const position = this.robotService.getPosition();
    if (position) {
      this.robot = position; // Update the robot's position if it exists
    } else {
      this.robot = null; // Set robot to null if it hasn't been placed
    }
  }
  

  moveRobot() {
    this.robotService.moveForward();
    this.updateRobotPosition();
    console.log(`MOVE`)
  }

  turnRobot(direction: 'LEFT' | 'RIGHT') {
    this.robotService.turn(direction);
    this.updateRobotPosition();
    console.log(`REPORT`)
  }

  placeRobot(x: number, y: number) {
    // Place the robot using the RobotService
    this.robotService.placeRobot(x, y);
    this.updateRobotPosition(); // Sync robot's position with the service
    console.log(`PLACE ${x}, ${y} ${this.robot?.direction}`);
  }

  generateReport() {
    console.log(`REPORT`)
    if (this.robot) {
      this.report = `Robot is at (${this.robot.x}, ${this.robot.y}) facing ${this.robot.direction}`;
      console.log(`Output: ${this.robot.x}, ${this.robot.y} ${this.robot?.direction}`)
    }else{
      console.log(`Robot not placed`)
    }
    this.showReport = true
  }  

}
