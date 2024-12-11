import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RobotService {
  private x: number | null = null; // Horizontal position (null by default)
  private y: number | null = null; // Vertical position (null by default)
  private direction: 'NORTH' | 'EAST' | 'SOUTH' | 'WEST' | null = null; // Direction (null by default)
  private gridSize = 5;

  getPosition() {
    if (this.x === null || this.y === null || this.direction === null) {
      return null; // Robot has not been placed
    }
    return { x: this.x, y: this.y, direction: this.direction }; // Return (x,y,F)
  }

  placeRobot(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.direction = 'NORTH'; // Default direction is North
  }

  moveForward() {
    // If placed, move robot forward but stay within grid bounds
    if (this.x !== null && this.y !== null && this.direction !== null) {
      switch (this.direction) {
        case 'NORTH':
          if (this.y < this.gridSize - 1) this.y++;
          break;
        case 'EAST':
          if (this.x < this.gridSize - 1) this.x++;
          break;
        case 'SOUTH':
          if (this.y > 0) this.y--;
          break;
        case 'WEST':
          if (this.x > 0) this.x--;
          break;
      }
    }
  }

  turn(dir: 'LEFT' | 'RIGHT') {
    if (this.direction !== null) {
      const directions: Array<'NORTH' | 'EAST' | 'SOUTH' | 'WEST'> = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
      const index = directions.indexOf(this.direction);
  
      if (dir === 'LEFT') {
        // Rotate counterclockwise, iterate one to the left
        this.direction = directions[(index + 3) % 4];
      } else if (dir === 'RIGHT') {
        // Rotate clockwise, iterate one to the right
        this.direction = directions[(index + 1) % 4];
      }
    }
  }
  
  
}
