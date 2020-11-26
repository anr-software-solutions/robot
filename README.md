# Toy Robot

Toy Robot application is a simulation of a toy robot moving on a square tabletop, of dimensions 5 units x 5 units. It takes PLACE X,Y,F, MOVE, LEFT, RIGHT, REPORT commands.

Repo URL: https://github.com/anr-software-solutions/robot.git

Main solution logic is in `robot/src/helpers/useRobotCommands.js`

Main test cases to test solution are in `robot/src/components/controlPanel/command/CommandRobot.test.js`

## Run and Test the project

To improve user experience and make use of flexibility of javascript, I have added html user interface to input commands. Website can be directly accessible with below URL.

User Interface URL: https://toy-robot.web.app/

####Run the project locally
Follow below steps to run it locally. You will need to have Node >= 8.10 and npm >= 5.6 on your machine.

- Clone project to your local machine. https://github.com/anr-software-solutions/robot.git
- Run `npm install && npm start` at `/robot`
- Project will be running on http://localhost:3000/

####Test the project

- Method 1: Run commands manually in https://toy-robot.web.app/. Instructions for test data are provided in the UI itself.
- Method 2: Follow instructions in above section to set up the project locally and run `npm test` at `/robot`.

<strong>Note that the main test cases to test the solution are at</strong> `robot/src/components/controlPanel/command/CommandRobot.test.js`. 

Project was not overloaded with other UI tests as the focus is mainly on solving the problem.


## Approach

Approach for the solution is mainly consists of below parts.
1. Have the application status of Robot location and facing direction. That is X, Y, F values in global state
2. When respective X, Y, F values are received in the PLACE command, then update the global state with it.
3. When other commands are received, check placement values are available and proceed.
4. Then, if the robot receives one of LEFT or RIGHT, change the facing direction based on current facing direction.
5. If the robot receives MOVE, calculate the new position, if it is within the table, then update the global placement state with it. Else ignore the MOVE command.
6. When the robot receives REPORT, announce the X, Y, F values of global state.

####Benefits of the React Framework used
1. Ability to offer more interactive user interface compared to console application
2. Easy to write tests/TDD approach with in built react-testing-library and Jest
3. Clean code and better project structure with modular architecture
4. Robust global state management using `react-redux`
