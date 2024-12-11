import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RobotService {
  private x: number | null = null; // Horizontal position (null by default)
  private y: number | null = null; // Vertical position (null by default)
  private direction: 'North' | 'East' | 'South' | 'West' | null = null; // Direction
  private gridSize = 5;

  getPosition() {
    if (this.x === null || this.y === null || this.direction === null) {
      return null; // Robot has not been placed
    }
    return { x: this.x, y: this.y, direction: this.direction };
  }

  placeRobot(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.direction = 'North'; // Default direction is North
    console.log(`Robot placed at (${x}, ${y}) facing ${this.direction}`);
  }

  moveForward() {
    if (this.x !== null && this.y !== null && this.direction !== null) {
      switch (this.direction) {
        case 'North':
          if (this.y < this.gridSize - 1) this.y++;
          break;
        case 'East':
          if (this.x < this.gridSize - 1) this.x++;
          break;
        case 'South':
          if (this.y > 0) this.y--;
          break;
        case 'West':
          if (this.x > 0) this.x--;
          break;
      }
      console.log(`Robot moved to (${this.x}, ${this.y}) facing ${this.direction}`);
    }
  }

  turn(dir: 'left' | 'right') {
    if (this.direction !== null) {
      const directions: Array<'North' | 'East' | 'South' | 'West'> = ['North', 'East', 'South', 'West'];
      const index = directions.indexOf(this.direction);
  
      if (dir === 'left') {
        // Move one step counterclockwise
        this.direction = directions[(index + 3) % 4];
      } else if (dir === 'right') {
        // Move one step clockwise
        this.direction = directions[(index + 1) % 4];
      }
  
      console.log(`Robot turned ${dir}, now facing ${this.direction}`);
    }
  }
  
  
}
