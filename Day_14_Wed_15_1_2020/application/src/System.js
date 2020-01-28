import React from 'react';
import logo from './ticketmachine.png';
import Button from 'react-bootstrap/Button';
import './App.css';
import history from './history';


function System() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
           Choose your next action:
          </p>
          <Button onClick={() => history.push("/maketicket")} size="lg" variant="light" style={{marginBottom:12}}>Make a ticket</Button>
          <Button onClick={() => history.push("/bookticket")} size="lg" variant="light" style={{marginBottom:12}}>Book a ticket</Button>
          <Button onClick={() => history.push("/getlatestticket")} size="lg" variant="light" style={{marginBottom:12}}>Details of the latest booked ticket</Button>
        </header>
      </div>
    );
  }

export default System;
