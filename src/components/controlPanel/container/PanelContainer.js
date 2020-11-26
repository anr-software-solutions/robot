import React from 'react';
import Grid from "@material-ui/core/Grid";
import PlaceRobot from "../place/PlaceRobot";
import CommandRobot from "../command/CommandRobot";

/**
 * Container layout of the control panel content
 * @returns {JSX.Element} Header
 */
const PanelContainer = () => {
  return (
    <div style={{flexGrow: 1}}>
      <Grid container spacing={3}>
        <Grid item xs={12} style={{paddingBottom: 35}}>
          <PlaceRobot/>
        </Grid>
        <Grid item xs={12}>
          <CommandRobot/>
        </Grid>
      </Grid>
    </div>
  );
}

export default PanelContainer;
