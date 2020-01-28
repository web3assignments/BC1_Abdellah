import React, { useEffect, useState } from "react";
import Web3 from 'web3';
import logo from './smallticket.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import './App.css';
import history from './history';
import ABI from './ABI';
import Web3Connect from "web3connect";

function web3connect() {

    return (
      <Web3Connect.Button
      network="mainnet" // optional
      providerOptions={providerOptions}
      onConnect={(provider: any) => {
        const web3 = new Web3(provider); // add provider to web3
      }}
      onClose={() => {
        console.log("Web3Connect Modal Closed"); // modal has closed
      }}
    />
    
    );
  }

export default web3connect;
