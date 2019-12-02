import React, { useState, useEffect } from 'react';

function App() {

  const[value, setValue] = useState("Undefined");
  const[socket, setSocket] = useState(new WebSocket("wss://mainnet.infura.io/ws/v3/0e9ff95cecd24727a40b418e2284390d"));
  const[style, setStyle] = useState({textAlign: 'center'});
  const[transactionsInBlock, settransactionsInBlock] = useState(0);

  useEffect(() => {
    socket.onopen = function (event) {
      const request=JSON.stringify({"id": 1, "method": "eth_subscribe", "params": ["newHeads"]});
      socket.send(request);
      console.log("Connection is opened.")
      };
      
      socket.onmessage = async function (event) {
        var data=JSON.parse(event.data);
        log(data.result);
        }
      
        socket.onerror = function(error) {
          log(`[Error: ${error.message}`);
      };
  });

function log (logstr) {   
    document.getElementById("log").innerHTML +=logstr+"\n";
}

function getLatestBlockNumber () {
    const request=JSON.stringify({"jsonrpc":2.0,"method":"eth_blockNumber","params":[],"id":1});
    socket.send(request);
}

function getTransactionCountWithinBlock () {
  for (let i = 0; i < 10; i++) {
  const request=JSON.stringify({"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":[value],"id":1});
  socket.send(request); }
}

function editValueInState (e) {
 setValue(e.target.value);
}

return(
  <div id="log">Undefined</div>);
}

export default App;