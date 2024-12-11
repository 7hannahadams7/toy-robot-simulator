# ToyRobotGame

## Introduction

This project is a toy robot simular made using Angular. The user can place the robot on a 5x5 grid, move it, rotate it, and report its position and direction. 

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.4.

## Given Requirements

1. The tabletop has no obstructions.
2. The robot can move freely on the tabletop but must not fall off.
3. Clicking on a table space will PLACE the robot on the table at the clicked position (using X, Y coordinates), facing north.
4. The origin (0,0) is at the SOUTH WEST corner of the table (bottom left).
5. The first valid command is a PLACE command. Subsequent commands can be issued in any order, including another PLACE command (i.e. you can click another space and it would place the original toy robot on that space).
6. MOVE will move the toy robot one space forward in the direction it is currently facing.
7. LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.
8. REPORT will announce the X,Y position and F (facing direction) of the robot.
9. A robot not on the table ignores commands.
10. Commands can be issued via buttons on the page or arrow keys 

## Assumptions

1. Once placed, the user will not need to remove the robot from the board. The goal of the simulator is to interact with the robot on the board and removing it is uncessary. 
2. The robot can be re-placed in a different square at any time. This gives the user more flexibility in interacting with the robot. 
3. The moves, turns, and reports are documented as provided in the console.
4. The REPORT button also outputs the report on the screen for the user in a more readable way. 
5. Interacting with the board in any way will remove the report until the REPORT button is pressed again. 
6. The robot icons and arrows are made from images for clarity, one for each direction. 

# Angular Framework Notes

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
