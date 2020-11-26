import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {appMessages, appConstants} from "../../../constants";
import UseRobotCommands from '../../../helpers/useRobotCommands';
import RestartSimulation from "./RestartSimulation";

/**
 * Control Robot with given input commands
 *
 * @returns {JSX.Element} PlaceRobot
 */
const CommandRobot = () => {
  const [command, setCommand] = React.useState('');
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');

  const commandArray = [appConstants.MOVE, appConstants.LEFT, appConstants.RIGHT, appConstants.REPORT];
  const {submitCommand} = UseRobotCommands(command ? command.toUpperCase() : command);

  const handleChange = (event) => {
    setError('');
    setMessage('');
    setCommand(event.target.value);
  };

  /**
   * Validates given command. Submit if the command is valid, else it shows appropriate message
   * @returns {Promise<void>}
   */
  const handleCommand = async () => {
    const upperCaseCommand = command.toUpperCase();
    if (commandArray.includes(upperCaseCommand)) {
      setError('');
      setMessage(submitCommand());
    } else if (upperCaseCommand.includes(appConstants.PLACE)) {
      setError(appMessages.USE_UPPER_PLACE);
      setMessage('');
    } else {
      setError(appMessages.INVALID_COMMAND);
      setMessage('');
    }
  };

  return (
    <div style={{flexGrow: 1}}>
      <TextField id="input-command" data-testid="input-command" label="Enter Command" variant="outlined" defaultValue={command}
                 onChange={handleChange} style={{paddingRight: 25}}
                 helperText="Enter one from MOVE, LEFT, RIGHT, REPORT"/>
      <Button data-testid="submit-command" variant="contained" color="primary" style={{height: 55}} onClick={handleCommand}>Submit Command</Button>
      <RestartSimulation/>
      {error && <div data-testid="error-command" style={{padding: 10, color: 'red'}}>{error}</div>}
      {message && <div data-testid="message-command" style={{paddingTop: 40, color: 'green', fontSize: 25}}>{message}</div>}
    </div>
  );
}

export default CommandRobot;
