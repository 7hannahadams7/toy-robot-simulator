import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameBoardComponent } from './game-board.component';
import {RobotService} from '../robot.service';

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;
  let robotService: RobotService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameBoardComponent],
      providers: [RobotService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    robotService = TestBed.inject(RobotService)
    fixture.detectChanges();
  });

  describe('Rendering', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    // GRID RENDERING
    it('should render 5x5 grid', () =>{
      const grid = fixture.nativeElement.querySelector('.grid');
      const cells = grid.querySelectorAll('.cell');
      expect(cells.length).toBe(25);
    });

    // ROBOT RENDERING
    it('should show a robot when robot is placed', () => {
      component.placeRobot(2,3);
      fixture.detectChanges();
      const robotCell = fixture.nativeElement.querySelector('.robot-image');
      expect(robotCell).toBeTruthy();
    });
  });

  describe('Placing', () => {
    // PLACE
    it('should place the robot in correct cell', () => {
      // Test (0,0)
      const cells = fixture.nativeElement.querySelectorAll('.cell');
      const cell = cells[0]; // Select the first cell
      cell.click(); // Simulate cell click
      fixture.detectChanges();
    
      expect(robotService.getPosition()).toEqual({ x: 0, y: 4, direction: 'NORTH' }); // Verify position
      

      // Test (1,2)
      const cell2 = cells[7]; // Select the 10th cell (0-based index)
      cell2.click(); // Simulate cell click
      fixture.detectChanges();
    
      expect(robotService.getPosition()).toEqual({ x: 1, y: 2, direction: 'NORTH' }); // Verify position
    });

    // MUST PLACE TO INTERACT
    it('should do nothing if robot has not been placed', () => {

      const leftButton = fixture.nativeElement.querySelector('button:first-child');
      leftButton.click();
      fixture.detectChanges();

      const moveButton = fixture.nativeElement.querySelector('button:nth-child(2)');
      moveButton.click();
      fixture.detectChanges();

      const rightButton = fixture.nativeElement.querySelector('button:nth-child(3)');
      rightButton.click();
      fixture.detectChanges();
    
      expect(robotService.getPosition()).toBeNull(); // Verify no changes occured
    });
  });
  
  
  describe('Button Functions', () => {
    // BUTTON MOVE
    it('should move the robot when Move button is clicked', () => {
      component.placeRobot(2,3);
      fixture.detectChanges();

      const moveButton = fixture.nativeElement.querySelector('button:nth-child(2)');
      moveButton.click();
      fixture.detectChanges();

      const robotCell = fixture.nativeElement.querySelector('.robot');
      expect(robotService.getPosition()).toEqual({x:2,y:4,direction:"NORTH"})
    });

    // BUTTON LEFT
    it('should turn the robot left when the Turn Left button is clicked', () => {
      component.placeRobot(2, 3);
      fixture.detectChanges();
    
      const leftButton = fixture.nativeElement.querySelector('button:first-child');

      leftButton.click();
      fixture.detectChanges();
      expect(robotService.getPosition()?.direction).toEqual('WEST');

      leftButton.click();
      fixture.detectChanges();
      expect(robotService.getPosition()?.direction).toEqual('SOUTH');

      leftButton.click();
      fixture.detectChanges();
      expect(robotService.getPosition()?.direction).toEqual('EAST');

      leftButton.click();
      fixture.detectChanges();
      expect(robotService.getPosition()?.direction).toEqual('NORTH');
    });
    
    // BUTTON RIGHT
    it('should turn the robot right when the Turn Right button is clicked', () => {
      component.placeRobot(2, 3);
      fixture.detectChanges();
    
      const rightButton = fixture.nativeElement.querySelector('button:nth-child(3)');

      rightButton.click();
      fixture.detectChanges();
      expect(robotService.getPosition()?.direction).toEqual('EAST');

      rightButton.click();
      fixture.detectChanges();
      expect(robotService.getPosition()?.direction).toEqual('SOUTH');

      rightButton.click();
      fixture.detectChanges();
      expect(robotService.getPosition()?.direction).toEqual('WEST');
    });

    // REPORT
    it('should display the robot position and direction when Report button is clicked', () => {
      component.placeRobot(1, 1);
      fixture.detectChanges();
    
      const reportButton = fixture.nativeElement.querySelector('.secondary');
      reportButton.click();
      fixture.detectChanges();
    
      const reportText = fixture.nativeElement.querySelector('p');
      expect(reportText.textContent).toContain('Output: Robot is at (1, 1) facing NORTH');
    });
  });

  describe('Keyboard Functions', () => {
    // KEYBOARD MOVE
    it('should move the robot forward on ArrowUp key press', () => {
      component.placeRobot(2, 3); // Place robot at initial position
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      window.dispatchEvent(event); // Simulate key press
      fixture.detectChanges();

      expect(robotService.getPosition()).toEqual({x:2,y:4,direction:"NORTH"})
    });

    // KEYBOARD LEFT
    it('should turn the robot left on ArrowLeft key press', () => {
      component.placeRobot(2, 3); // Place robot at initial position
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      
      window.dispatchEvent(event); // Simulate key press
      fixture.detectChanges();
      expect(robotService.getPosition()).toEqual({x:2,y:3,direction:"WEST"})

      window.dispatchEvent(event); // Simulate key press
      fixture.detectChanges();
      expect(robotService.getPosition()).toEqual({x:2,y:3,direction:"SOUTH"})

      window.dispatchEvent(event); // Simulate key press
      fixture.detectChanges();
      expect(robotService.getPosition()).toEqual({x:2,y:3,direction:"EAST"})

      window.dispatchEvent(event); // Simulate key press
      fixture.detectChanges();
      expect(robotService.getPosition()).toEqual({x:2,y:3,direction:"NORTH"})
    });
    
    // KEYBOARD RIGHT
    it('should turn the robot right on ArrowRight key press', () => {
      component.placeRobot(2, 3); // Place robot at initial position
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });

      window.dispatchEvent(event); // Simulate key press
      fixture.detectChanges();
      expect(robotService.getPosition()).toEqual({x:2,y:3,direction:"EAST"})

      window.dispatchEvent(event); // Simulate key press
      fixture.detectChanges();
      expect(robotService.getPosition()).toEqual({x:2,y:3,direction:"SOUTH"})

      window.dispatchEvent(event); // Simulate key press
      fixture.detectChanges();
      expect(robotService.getPosition()).toEqual({x:2,y:3,direction:"WEST"})

      window.dispatchEvent(event); // Simulate key press
      fixture.detectChanges();
      expect(robotService.getPosition()).toEqual({x:2,y:3,direction:"NORTH"})
    });

    // UNRECOGNIZED KEYS
    it('should do nothing for unrecognized keys', () => {
      component.placeRobot(2, 3); // Place robot at initial position
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'a' }); // Simulate a non-mapped key
      window.dispatchEvent(event);
      fixture.detectChanges();

      expect(robotService.getPosition()).toEqual({x:2,y:3,direction:"NORTH"})
    });
  }); 


});
