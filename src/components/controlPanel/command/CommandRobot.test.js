import React from "react";
import {testRender, makeTestStore} from "../../../testUtils";
import CommandRobot from "./CommandRobot";
import {UPDATE_PLACEMENT} from "../../../reducer";
import {fireEvent} from "@testing-library/react";
import {appMessages} from "../../../constants";
import {waitFor} from "@testing-library/react";

describe("CommandRobot component", () => {
  /**
   * Test PLACE 0,0,NORTH
   * MOVE
   * Expected Message: "Here you go!"
   */
  it('Gives "Here you go!" message when robot gets a valid Move command', async () => {
    const {getByTestId} = placeRobot(0, 0, 'NORTH');

    // Enter "MOVE" Command
    await enterCommand(getByTestId, "MOVE");
    expect(getByTestId('message-command')).toHaveTextContent(appMessages.GO_FORWARD);
  });

  /**
   * Test PLACE 1,5,NORTH
   * MOVE
   * Expected Message: "Cannot move! Do not break the robot"
   */
  it('Gives "Cannot move! Do not break the robot" message, when robot gets a Move command and in danger to fell from the table', async () => {
    const {getByTestId} = placeRobot(1, 5, 'NORTH');

    // Enter "MOVE" Command
    await enterCommand(getByTestId, "MOVE");
    expect(getByTestId('message-command')).toHaveTextContent(appMessages.CANNOT_MOVE);
  });

  /**
   * Test PLACE 0,0,NORTH
   * MOVE
   * REPORT
   * Output: "X placement is 0, Y placement is 1 and the robot is facing NORTH"
   */
  it('Testing PLACE 0,0,NORTH, MOVE, REPORT and OUTPUT', async () => {
    const {getByTestId} = placeRobot(0, 0, 'NORTH');

    // Enter "MOVE" Command
    await enterCommand(getByTestId, "MOVE");
    expect(getByTestId('message-command')).toHaveTextContent(appMessages.GO_FORWARD);

    // Enter "REPORT" Command
    await enterCommand(getByTestId, "REPORT");
    expect(getByTestId('message-command')).toHaveTextContent("X placement is 0, Y placement is 1 and the robot is facing NORTH");
  });

  /**
   * Test PLACE 0,0,NORTH
   * LEFT
   * REPORT
   * Output: "X placement is 0, Y placement is 0 and the robot is facing WEST"
   */
  it('Testing PLACE 0,0,NORTH, LEFT, REPORT and OUTPUT', async () => {
    const {getByTestId} = placeRobot(0, 0, 'NORTH');

    // Enter "LEFT" Command
    await enterCommand(getByTestId, "LEFT");
    expect(getByTestId('message-command')).toHaveTextContent(appMessages.TURN_LEFT);

    // Enter "REPORT" Command
    await enterCommand(getByTestId, "REPORT");
    expect(getByTestId('message-command')).toHaveTextContent("X placement is 0, Y placement is 0 and the robot is facing WEST");
  });

  /**
   * PLACE 1,2,EAST
   * MOVE
   * MOVE
   * LEFT
   * MOVE
   * REPORT
   * Output: "X placement is 3, Y placement is 3 and the robot is facing NORTH"
   * MOVE 3 times - (Check Fall detection)
   * LEFT
   * REPORT
   * Output: "X placement is 3, Y placement is 5 and the robot is facing WEST"
   * PLACE 5,5,SOUTH
   * MOVE
   * REPORT
   * Output: "X placement is 5, Y placement is 4 and the robot is facing SOUTH"
   */
  it('Testing above mentioned test steps and outputs', async () => {
    const store = makeTestStore();
    // Place the ROBOT at "1,2,EAST"
    store.dispatch({type: UPDATE_PLACEMENT, xPlacement: 1, yPlacement: 2, direction: 'EAST'});
    const {getByTestId} =  testRender(<CommandRobot/>, {store});

    await enterCommand(getByTestId, "MOVE");
    await enterCommand(getByTestId, "MOVE");
    await enterCommand(getByTestId, "LEFT");
    await enterCommand(getByTestId, "MOVE");
    await enterCommand(getByTestId, "REPORT");
    expect(getByTestId('message-command')).toHaveTextContent("X placement is 3, Y placement is 3 and the robot is facing NORTH");

    await enterCommand(getByTestId, "MOVE");
    await enterCommand(getByTestId, "MOVE");
    await enterCommand(getByTestId, "MOVE");
    await enterCommand(getByTestId, "LEFT");
    await enterCommand(getByTestId, "REPORT");
    expect(getByTestId('message-command')).toHaveTextContent("X placement is 3, Y placement is 5 and the robot is facing WEST");

    // Place the ROBOT at "5,5,SOUTH"
    store.dispatch({type: UPDATE_PLACEMENT, xPlacement: 5, yPlacement: 5, direction: 'SOUTH'});
    await enterCommand(getByTestId, "MOVE");
    await enterCommand(getByTestId, "REPORT");
    expect(getByTestId('message-command')).toHaveTextContent("X placement is 5, Y placement is 4 and the robot is facing SOUTH");
  });

  //-------------End of Test Cases-------------------------//

  /**
   * Util method to enter command
   *
   * @param getByTestId
   * @param command
   * @returns {Promise<void>}
   */
  const enterCommand = async (getByTestId, command) => {
    const input = getByTestId('input-command').querySelector('input');
    fireEvent.change(input, {target: {value: command}});
    expect(input.value).toBe(command);
    fireEvent.click(getByTestId('submit-command'));
    await waitFor(() => getByTestId('message-command'));
  }

  /**
   * Util method to load component and place robot
   * @param xPlacement
   * @param yPlacement
   * @param direction
   */
  const placeRobot = (xPlacement, yPlacement, direction) => {
    const store = makeTestStore();
    store.dispatch({type: UPDATE_PLACEMENT, xPlacement: xPlacement, yPlacement: yPlacement, direction: direction});
    return testRender(<CommandRobot/>, {store});
  }
});