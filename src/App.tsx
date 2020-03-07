import React from "react";
import Splitter from './Splitter';
import styled from "styled-components";

const Pane1 = styled.div`
  height: 300px;
  background: purple;
`

const Pane2 = styled.div`
  height: 300px;
  background: cyan;
`

function App() {
  return (
    <Splitter initialSizes={[200, 200]}>
      <Pane1>1</Pane1>
      <Pane2>2</Pane2>
    </Splitter>
  );
}

export default App;
