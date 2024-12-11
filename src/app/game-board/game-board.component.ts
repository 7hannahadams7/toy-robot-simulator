import { Component, OnInit, HostListener } from '@angular/core';
import { RobotService } from '../robot.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
})
export class GameBoardComponent implements OnInit {
  grid: number[][];
  robot: { x: number; y: number; direction: string } | null = null; // Robot starts as null
  report: string = 'Robot has not been placed.'; // Initialize with a default message
  showReport: boolean = false; // Default to not showing report

  constructor(private robotService: RobotService) {
    this.grid = Array(5)
      .fill(null)
      .map(() => Array(5).fill(null)); // Create a 5x5 grid
  }

  ngOnInit() {
    this.updateRobotPosition(); // Initialize the robot's position
  }

  updateRobotPosition() {
    this.showReport = false // Any changes to the robot will turn off the report
    const position = this.robotService.getPosition();
    if (position) {
      this.robot = position; // Update the robot's position if it's been placed
    }
  }
  
  moveRobot() {
    // Service iterates robot forward, component syncs position
    this.robotService.moveForward();
    this.updateRobotPosition();
    console.log(`MOVE`)
  }

  turnRobot(direction: 'LEFT' | 'RIGHT') {
    // Service turns robot in direction, component syncs position
    this.robotService.turn(direction);
    this.updateRobotPosition();
    console.log(`REPORT`)
  }

  placeRobot(x: number, y: number) {
    // Service places robot, component syncs position
    this.robotService.placeRobot(x, y);
    this.updateRobotPosition();
    console.log(`PLACE ${x}, ${y} ${this.robot?.direction}`);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        this.moveRobot();
        break;
      case 'ArrowLeft':
        this.turnRobot('LEFT');
        break;
      case 'ArrowRight':
        this.turnRobot('RIGHT');
        break;
    }
  }

  generateReport() {
    console.log(`REPORT`)
    // If robot placed, displays (x,y,F), if not says 'Robot has not been placed'
    if (this.robot) {
      this.report = `Robot is at (${this.robot.x}, ${this.robot.y}) facing ${this.robot.direction}`;
      console.log(`Output: ${this.robot.x}, ${this.robot.y} ${this.robot?.direction}`)
    }else{
      console.log(`${this.report}`)
    }
    this.showReport = true
  }  

}
