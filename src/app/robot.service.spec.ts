import { TestBed } from '@angular/core/testing';
import { RobotService } from './robot.service';

describe('RobotService', () => {
  let service: RobotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RobotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Placing', () => {
    // PLACE ROBOT
    it('should place robot at position and default to NORTH', () => {
      service.placeRobot(2,3);
      expect(service.getPosition()).toEqual({x:2, y:3, direction: "NORTH"});
    });

    // MUST PLACE TO INTERACT
    it('should not do anything when robot is not placed', () => {
      expect(service.getPosition()).toBeNull();
  
      service.moveForward();
      expect(service.getPosition()).toBeNull();
  
      service.turn("LEFT");
      expect(service.getPosition()).toBeNull();
  
      service.turn("RIGHT");
      expect(service.getPosition()).toBeNull();
    })
  });

  describe('Interactions', () => {
    // MOVE
    it('should move robot forward in current direction', () => {
      service.placeRobot(2,3);
      service.moveForward();
      expect(service.getPosition()).toEqual({x:2, y:4, direction: "NORTH"});
    })

    // LEFT
    it('should turn robot LEFT', () => {
      service.placeRobot(2,3);
      service.turn("LEFT");
      expect(service.getPosition()).toEqual({x:2, y:3, direction: "WEST"});

      service.turn("LEFT");
      expect(service.getPosition()).toEqual({x:2, y:3, direction: "SOUTH"});

      service.turn("LEFT");
      expect(service.getPosition()).toEqual({x:2, y:3, direction: "EAST"});

      service.turn("LEFT");
      expect(service.getPosition()).toEqual({x:2, y:3, direction: "NORTH"});
    })

    // RIGHT
    it('should turn robot RIGHT', () => {
      service.placeRobot(2,3);
      service.turn("RIGHT");
      expect(service.getPosition()).toEqual({x:2, y:3, direction: "EAST"});

      service.turn("RIGHT");
      expect(service.getPosition()).toEqual({x:2, y:3, direction: "SOUTH"});

      service.turn("RIGHT");
      expect(service.getPosition()).toEqual({x:2, y:3, direction: "WEST"});

      service.turn("RIGHT");
      expect(service.getPosition()).toEqual({x:2, y:3, direction: "NORTH"});
    });
  });
  
  describe('Out of Bounds', () => {
    // OUT OF BOUNDS
    [
      { x: 2, y: 4, direction: 'NORTH' as 'NORTH', moveX: 2, moveY: 4 },
      { x: 2, y: 0, direction: 'SOUTH' as 'SOUTH', moveX: 2, moveY: 0 },
      { x: 4, y: 2, direction: 'EAST' as 'EAST', moveX: 4, moveY: 2 },
      { x: 0, y: 2, direction: 'WEST' as 'WEST', moveX: 0, moveY: 2 }
    ].forEach(({ x, y, direction, moveX, moveY }) => {
      it(`should not move out of bounds ${direction}`, () => {
        service.placeRobot(x, y);
    
        // Change direction to point out of bounds
        if (direction === 'NORTH') service.moveForward();
        else if (direction === 'SOUTH') {
          service.turn('RIGHT');
          service.turn('RIGHT');
          service.moveForward();
        } else if (direction === 'EAST') {
          service.turn('RIGHT');
          service.moveForward();
        } else if (direction === 'WEST') {
          service.turn('LEFT');
          service.moveForward();
        }
    
        expect(service.getPosition()).toEqual({ x: moveX, y: moveY, direction });
      });
    });
  });

});
