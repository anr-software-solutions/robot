import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useDispatch} from 'react-redux';
import {UPDATE_PLACEMENT} from "../../../reducer";
import {appMessages} from '../../../constants';

/**
 * Place the Robot according to given inputs, X, Y, Direction
 * @returns {JSX.Element} PlaceRobot
 */
const PlaceRobot = () => {
  const dispatch = useDispatch();
  const [x, setX] = React.useState(null);
  const [y, setY] = React.useState(null);
  const [direction, setDirection] = React.useState('');

  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');

  const coordinateArray = [0, 1, 2, 3, 4, 5];
  const directionArray = ["NORTH", "SOUTH", "EAST", "WEST"];

  const handleXChange = (event) => {
    clearMessages();
    setX(parseInt(event.target.value));
  };

  const handleYChange = (event) => {
    clearMessages();
    setY(parseInt(event.target.value));
  };

  const handleDirectionChange = (event) => {
    clearMessages();
    setDirection(event.target.value);
  };

  const clearMessages = () => {
    setError('');
    setMessage('');
  };

  /**
   * Validates given command.
   * Dispatch placement values if the command is valid, else it shows appropriate error message
   *
   */
  const handlePlaceRobot = () => {
    if (coordinateArray.includes(x) && coordinateArray.includes(y) && direction && directionArray.includes(direction.toUpperCase())) {
      setMessage(appMessages.VALID_PLACE);
      setError('');
      dispatch({type: UPDATE_PLACEMENT, xPlacement: x, yPlacement: y, direction: direction.toUpperCase()});
    } else {
      setMessage('');
      setError(appMessages.INVALID_PLACE);
    }
  };

  return (
    <div style={{flexGrow: 1}}>
      <TextField id="x-placement" label="X Placement" variant="outlined" onChange={handleXChange}
                 style={{paddingRight: 25}} helperText="Enter one from 0, 1, 2, 3, 4, 5"/>
      <TextField id="y-placement" label="Y Placement" variant="outlined" onChange={handleYChange}
                 style={{paddingRight: 25}} helperText="Enter one from 0, 1, 2, 3, 4, 5"/>
      <TextField id="direction" label="Direction" variant="outlined" defaultValue={direction}
                 onChange={handleDirectionChange} style={{paddingRight: 25}}
                 helperText="Enter one from NORTH, SOUTH, EAST, WEST"/>
      <Button variant="contained" color="primary" style={{height: 55}} onClick={handlePlaceRobot}>Place Robot</Button>
      {error && <div style={{padding: 10, color: 'red'}}>{error}</div>}
      {message && <div style={{padding: 10, color: 'green'}}>{message}</div>}
    </div>
  );
}

export default PlaceRobot;
