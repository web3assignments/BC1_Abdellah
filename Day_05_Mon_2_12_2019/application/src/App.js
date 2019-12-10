import React from 'react';
import logo from './ticketmachine.png';
import Button from 'react-bootstrap/Button';
import './App.css';
import history from './history';


function App() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to the ticketing system!
          </p>
          <Button onClick={() => history.push("/system")} size="lg" variant="light">Click here to start</Button>
        </header>
      </div>
    );
  }

export default App;
