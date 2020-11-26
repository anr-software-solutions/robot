import {useSelector} from 'react-redux';
import {appMessages, appConstants} from '../constants';
import useDispatchNewPlacement from './useDispatchNewPlacement';

/**
 * Calculate whether robot is in the table after a command
 *
 * @returns {}
 */
const UseRobotCommands = (command) => {
  const {dispatchNewPlacement} = useDispatchNewPlacement(command);

  let xPlacement = useSelector(state => state.xPlacement);
  let yPlacement = useSelector(state => state.yPlacement);
  let direction = useSelector(state => state.direction);

  const TABLE_LENGTH = 5;
  const STARTING_COORDINATE = 0;

  const submitCommand = () => {
    if (!(xPlacement || xPlacement === 0) || !(yPlacement || yPlacement === 0) || !direction) {
      return appMessages.PLACE_FIRST;
    } else {
      return executeCommand();
    }
  }

  const executeCommand = () => {
    switch (command) {
      case appConstants.MOVE:
        return handleMoveCommand();
      case appConstants.REPORT:
        return 'X placement is ' + xPlacement + ', Y placement is ' + yPlacement + ' and the robot is facing ' + direction;
      case appConstants.LEFT:
        dispatchNewPlacement();
        return appMessages.TURN_LEFT;
      case appConstants.RIGHT:
        dispatchNewPlacement();
        return appMessages.TURN_RIGHT;
      default:
        return appMessages.INVALID_COMMAND;
    }
  }

  const handleMoveCommand = () => {
    const fallFromWest = xPlacement === STARTING_COORDINATE && direction === appConstants.WEST;
    const fallFromEast = xPlacement === TABLE_LENGTH && direction === appConstants.EAST;
    const fallFromSouth = yPlacement === STARTING_COORDINATE && direction === appConstants.SOUTH;
    const fallFromNorth = yPlacement === TABLE_LENGTH && direction === appConstants.NORTH;

    if (fallFromWest || fallFromEast || fallFromSouth || fallFromNorth) {
      return appMessages.CANNOT_MOVE;
    } else {
      dispatchNewPlacement();
      return appMessages.GO_FORWARD;
    }
  }

  return {
    submitCommand
  };
};

export default UseRobotCommands;
