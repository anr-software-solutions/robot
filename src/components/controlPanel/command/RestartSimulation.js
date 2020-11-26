import React from 'react';
import Button from "@material-ui/core/Button";
import {CLEAR_STATE} from "../../../reducer";
import {useDispatch} from "react-redux";

/**
 * Restart Toy Robot simulation from the beginning
 * @returns {JSX.Element} PlaceRobot
 */
const RestartSimulation = () => {
  const dispatch = useDispatch();

  const handleRestart = async () => {
    await dispatch({type: CLEAR_STATE});
    window.location.reload();
  };

  return (
    <span style={{paddingLeft: 25}}>
      <Button
        variant="contained"
        color="secondary"
        style={{height: 55}}
        onClick={handleRestart}>
      Restart Simulation
    </Button>
    </span>
  );
}

export default RestartSimulation;
