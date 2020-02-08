import React, { useEffect, useState } from "react";
import Web3 from 'web3';
import logo from './smallticket.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import './App.css';
import history from './history';
import ABI from './ABI';


function MakeTicket() {

  const [contract, setContract] = useState({});
  const [eventName, setEventName] = useState("");
  const [eventPlace, setEventPlace] = useState("");
  const [eventId, setEventId] = useState("");
  const [wallet, setWallet] = useState(0);
  let web3;

  useEffect(() => {
    start();
  }, []);

  const start = async () => {
    web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const currentAddress = await web3.eth.getAccounts();
    setWallet(currentAddress[0]);
    const ticketSystem = new web3.eth.Contract(ABI, "0x33f315d0d7D425666b8A908c656F0e9163A3A5D1");
    setContract(ticketSystem);
  }

  const log = (result) => {
    document.getElementById("log").innerHTML +=result+"\n";
  }

  const makeTicket = () => {
    const result = contract.methods.makeTicket(
      eventName, eventPlace
    ).call({ from: wallet })
    .then((result) => {
      log("Ticket is made!")
    });
  }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="minApp-logo" alt="logo" />
          <p>
          Make a ticket:
          </p>
          <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Control type="nameOfEvent" placeholder="Name of the event" onChange={name => setEventName(name.target.value)}/>
  </Form.Group>
  <Form.Group controlId="formBasicEmail">
    <Form.Control type="placeOfEvent" placeholder="Place of the event" onChange={place => setEventPlace(place.target.value)}/>
  </Form.Group>

  <Button onClick={() => makeTicket()} variant="primary" type="button" style={{marginBottom:12}}>
    Submit
  </Button>
  <div id="log"></div>
</Form>
          <Button onClick={() => history.push("/system")} size="lg" variant="light">Go back to all the options</Button>
        </header>
      </div>
    );
  }

export default MakeTicket;
