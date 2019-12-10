import React, { useEffect, useState } from "react";
import Web3 from 'web3';
import logo from './smallticket.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import './App.css';
import history from './history';
import ABI from './ABI';


function GetLatestTicket() {

  const [contract, setContract] = useState({});
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

  const getDetails = () => {
    const result = contract.methods.getLatestTicketBookedDetails().send({ from: wallet })
    .then((result) => {
      log(result);
    });
  }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="minApp-logo" alt="logo" />
          <Button onClick={() => getDetails()} variant="primary" type="button" style={{marginBottom:12}}>Click to get the details</Button>
          <div id="log"></div>
          <Button onClick={() => history.push("/system")} size="lg" variant="light">Go back to all the options</Button>
        </header>
      </div>
    );
  }

export default GetLatestTicket;
