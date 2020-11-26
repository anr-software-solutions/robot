import {useDispatch, useSelector} from 'react-redux';
import {UPDATE_X_PLACEMENT, UPDATE_Y_PLACEMENT, UPDATE_DIRECTION} from "../reducer";
import {appConstants} from '../constants';

/**
 * Calculate whether robot is in the table after a command
 *
 * @returns {}
 */
const UseDispatchNewPlacement = (command) => {
  const dispatch = useDispatch();

  let xPlacement = useSelector(state => state.xPlacement);
  let yPlacement = useSelector(state => state.yPlacement);
  let direction = useSelector(state => state.direction);

  const dispatchNewPlacement = () => {
    switch (command) {
      case appConstants.MOVE:
        dispatchMove();
        break;
      case appConstants.LEFT:
        dispatchLeft();
        break;
      case appConstants.RIGHT:
        dispatchRight();
        break;
      default:
        break;
    }
  }

  const dispatchMove = () => {
    switch (direction) {
      case appConstants.WEST:
        dispatch({type: UPDATE_X_PLACEMENT, xPlacement: xPlacement - 1});
        break;
      case appConstants.EAST:
        dispatch({type: UPDATE_X_PLACEMENT, xPlacement: xPlacement + 1});
        break;
      case appConstants.SOUTH:
        dispatch({type: UPDATE_Y_PLACEMENT, yPlacement: yPlacement - 1});
        break;
      case appConstants.NORTH:
        dispatch({type: UPDATE_Y_PLACEMENT, yPlacement: yPlacement + 1});
        break;
      default:
        break;
    }
  }

  const dispatchLeft = () => {
    switch (direction) {
      case appConstants.WEST:
        dispatch({type: UPDATE_DIRECTION, direction: appConstants.SOUTH});
        break;
      case appConstants.EAST:
        dispatch({type: UPDATE_DIRECTION, direction: appConstants.NORTH});
        break;
      case appConstants.SOUTH:
        dispatch({type: UPDATE_DIRECTION, direction: appConstants.EAST});
        break;
      case appConstants.NORTH:
        dispatch({type: UPDATE_DIRECTION, direction: appConstants.WEST});
        break;
      default:
        break;
    }
  }

  const dispatchRight = () => {
    switch (direction) {
      case appConstants.WEST:
        dispatch({type: UPDATE_DIRECTION, direction: appConstants.NORTH});
        break;
      case appConstants.EAST:
        dispatch({type: UPDATE_DIRECTION, direction: appConstants.SOUTH});
        break;
      case appConstants.SOUTH:
        dispatch({type: UPDATE_DIRECTION, direction: appConstants.WEST});
        break;
      case appConstants.NORTH:
        dispatch({type: UPDATE_DIRECTION, direction: appConstants.EAST});
        break;
      default:
        break;
    }
  }

  return {
    dispatchNewPlacement
  };
};

export default UseDispatchNewPlacement;
