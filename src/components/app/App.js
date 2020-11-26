import React from 'react';
import './App.css';
import Header from '../header/Header';
import PanelContainer from "../controlPanel/container/PanelContainer";

/**
 * This is the root container of application.
 * Loads header with logo, title and control panel of the Toy Robot
 *
 * @returns {JSX.Element}  Returns outer container with content
 */
const App = () => {
  return (
    <div className="app">
      <Header/>
      <div className="app-contents">
        <h2>Toy Robot Simulation</h2>
        <div style={{paddingTop: 40, fontStyle: 'italic'}}>
          <div style={{paddingBottom: 20}}>- Use upper panel to place the Toy Robot by entering X, Y, Facing Direction and clicking 'PLACE ROBOT'. Table size is 5x5 units.</div>
          <div>- Then use lower panel to give other commands to Toy Robot. Commands are case insensitive.</div>
        </div>
        <div style={{paddingTop: 60}}>
          <PanelContainer/>
        </div>
      </div>
    </div>
  );
}

export default App;
