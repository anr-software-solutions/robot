# Toy Robot

Toy Robot application is a simulation of a toy robot moving on a square tabletop, of dimensions 5 units x 5 units. It takes PLACE X,Y,F, MOVE, LEFT, RIGHT, REPORT commands.

Check this out: https://toy-robot.web.app/

Repo URL: https://github.com/anr-software-solutions/robot.git

Main solution logic is in `src/helpers/useRobotCommands.js`

Main test cases to test solution are in `src/components/controlPanel/command/CommandRobot.test.js`

## Run and Test the project

To improve user experience and make use of flexibility of javascript, I have added html user interface to input commands. Website can be directly accessible with below URL.

User Interface URL: https://toy-robot.web.app/

### Run the project locally
Follow below steps to run it locally. You will need to have Node >= 8.10 and npm >= 5.6 on your machine.

- Clone project to your local machine. https://github.com/anr-software-solutions/robot.git
- Run `npm install && npm start` at root
- Project will be running on http://localhost:3000/

### Test the project

- Method 1: Run commands manually in https://toy-robot.web.app/. Instructions for test data are provided in the UI itself.
- Method 2: Follow instructions in above section to set up the project locally and run `npm test` at `/robot`.

<strong>Note that the main test cases to test the solution are at</strong> `src/components/controlPanel/command/CommandRobot.test.js`. 

Project was not overloaded with other UI tests as the focus is mainly on solving the problem.


## Approach

Approach for the solution is mainly consists of below parts.
1. Implement the application status of Robot, in terms of location and facing direction. That is X, Y, F values in global state.
2. When respective X, Y, F values are received in the PLACE command, then the global state will be with it.
3. When other commands are received, availability of the placement values are checked and proceed.
4. Then, if the robot receives one of LEFT or RIGHT, the facing direction will be changed based on current facing direction.
5. If the robot receives MOVE, the new position will be calculated, and if it is within the table, then the global placement state will be updated with it. Else the MOVE command will be ignored.
6. When the robot receives REPORT, the X, Y, F values of global state will be printed on the UI.

### Benefits of the React Framework used
1. Ability to offer more interactive user interface compared to a console application
2. Easy to write tests/TDD approach with in built react-testing-library and Jest library
3. Clean code and better project structure with modular architecture
4. Robust global state management using `react-redux`
