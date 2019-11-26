import React, { useState, useEffect } from 'react';

function App() {

  const[value, setValue] = useState("Undefined");
  const[socket, setSocket] = useState(new WebSocket("wss://mainnet.infura.io/ws/v3/0e9ff95cecd24727a40b418e2284390d"));
  const[style, setStyle] = useState({textAlign: 'center'});
  const[transactionsInBlock, settransactionsInBlock] = useState(0);

  useEffect(() => {
   init();
  });

function loggg (logstr) {   
    document.getElementById("log").innerHTML +=logstr+"\n";
};  

function getLatestBlockNumber () {
  const request=JSON.stringify({"jsonrpc":2.0,"method":"eth_blockNumber","params":[],"id":1});
  socket.send(request); 
};

function getTransactionCountWithinBlock () {
  const request=JSON.stringify({"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":[value],"id":1});
  socket.send(request); 
};

function editValueInState (e) {
 setValue(e.target.value);
};

function init() {
socket.onopen = function (event) {
console.log("Connection is opened.")
};

socket.onmessage = async function (event) {
  var data=JSON.parse(event.data);
  var length = data.result.length;

  switch(length) {
    case 8 :
      loggg(`Latest block number: ${data.result}`);
      setValue(data.result);
      break;
    case 4 :
        loggg(`Count of transactions in this block: ${data.result}`);
        break;
  }


};

socket.onerror = function(error) {
    loggg(`[Error: ${error.message}`);
};
}

  return( 
    <div style={style} >
  <div id="log" ></div>
  
  <div><button onClick={getLatestBlockNumber} >Get latest block number</button></div>
  <label>  </label>
  <div><input type="text" name="name" value={value} onChange={editValueInState}/> <button onClick={getTransactionCountWithinBlock} >Get count of transaction in this block</button></div>
  </div>);
}

export default App;