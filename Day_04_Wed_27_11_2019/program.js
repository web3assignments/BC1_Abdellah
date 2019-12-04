const Web3 = require('web3');
const web3 = new Web3 ('https://ropsten.infura.io');
const TestPayABI = [{
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "bookTicket",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "eventName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "eventPlace",
        "type": "string"
      }
    ],
    "name": "makeTicket",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "lastTicketBooked",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "eventName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "eventPlace",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "booked",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "ticketArray",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "eventName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "eventPlace",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "booked",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getLatestTicketBookedDetails",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "eventName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "eventPlace",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "eventName",
        "type": "string"
      }
    ],
    "name": "ticketIsBooked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "eventName",
        "type": "string"
      }
    ],
    "name": "ticketIsMade",
    "type": "event"
  }];

  const address = "0x654D1A5e5B9084076eCA610663d3052D6FDDABCD";
  var result = "";
  const account = web3.eth.accounts.privateKeyToAccount("0x6FB818C39B2BC26DA76303C11069A5EE2F0E5A38534A804C9A6FCCC7C01947D4");
  web3.eth.accounts.wallet.add(account);
  web3.eth.defaultAccount = account.address;
  const makeTicketTest = new web3.eth.Contract(TestPayABI, address);


   async function makeTicket() {
    result = await makeTicketTest.methods
    .makeTicket("test", "hoi")
    .send({ from: web3.eth.defaultAccount, gas: 4000000 })
    .catch(error => {console.log("Error in makeTicket(): " + error)});
  }

  async function bookTicket() {
     result = await makeTicketTest.methods
     .bookTicket(0)
     .send({ from: web3.eth.defaultAccount, gas: 4000000 })
     .catch(error => {console.log("Error in bookTicket(): " + error)});
  }

  async function getLatestTicketBookedDetails() {
    result = await makeTicketTest.methods
    .getLatestTicketBookedDetails()
    .call()
    .catch(error => {console.log("Error in bookTicket(): " + error)});
    console.log(result);
  }

  async function test() {
    await makeTicket();
    await bookTicket(0);
    await getLatestTicketBookedDetails();
  }

  test();

