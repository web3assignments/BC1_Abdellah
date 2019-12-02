import React, { useState, useEffect } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const[block, setBlock] = useState([{
    difficulty: "", 
    extraData: "", 
    gasLimit: "", 
    gasUsed: "", 
    hash: "", 
    logsBloom: "",
    miner: "", 
    number: "",
    mixHash: ""}]);

  const[socket] = useState(new WebSocket("wss://mainnet.infura.io/ws/v3/0e9ff95cecd24727a40b418e2284390d"));

  useEffect(() => {
    socket.onopen = function (event) {
      const request=JSON.stringify({"id": 1, "method": "eth_subscribe", "params": ["newHeads"]});
      socket.send(request);
      };
      
      socket.onmessage = async function (event) {
        var data = JSON.parse(event.data);
        if (data.params != null) {
          const obj = {
            difficulty : data.params.result.difficulty,
            extraData : data.params.result.extraData,
            gasLimit : data.params.result.gasLimit,
            gasUsed : data.params.result.gasUsed,
            number: data.params.result.number,
            hash : data.params.result.hash,
            logsBloom : data.params.result.logsBloom,
            miner : data.params.result.miner,
            mixHash : data.params.result.mixHash
          };
          setBlock(previousBlocks => [...previousBlocks, obj]);
        }
        };
      
        socket.onerror = function(error) {
          alert(`[Error: ${error.message}`);
      };
  });

const final = block.filter(filter => filter.hash !== "");
const Li = styled.li`
word-wrap: break-word
`;
const Hi = styled.h4`
word-wrap: break-word
`;

return (<>
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand>
     {' '}
      Transaction info via WebSockets
    </Navbar.Brand>
  </Navbar>
  <Container fluid={true}>
  <Row>
{final.map((blocks, index) => <Col key={index} lg={3}><div>
  <Hi>Block: {blocks.hash}</Hi>
  <ul>
<Li>difficulty: {blocks.difficulty}</Li>
<Li>extraData: {blocks.extraData}</Li>
<Li>gasLimit: {blocks.gasLimit}</Li>
<Li>gasUsed: {blocks.gasUsed}</Li>
<Li>number: {blocks.number}</Li>
<Li>logsBloom: {blocks.logsBloom}</Li>
<Li>miner: {blocks.miner}</Li>
<Li>mixHash: {blocks.mixHash}</Li>
</ul>
</div></Col>)}
  </Row>
</Container>
</>);}

export default App;
