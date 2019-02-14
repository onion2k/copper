import React, { useState, useEffect } from "react";
import { render } from "react-dom";

import useMousePosition from "./Hooks/useMousePosition";

import { Const } from "./Nodes/const";
import { Time } from "./Nodes/time";
import { Value } from "./Nodes/value";
import { Math } from "./Nodes/math";
import { ConnectorContext } from "./Contexts/connector";

import "./styles.css";

function setOutput(output: any) {}

function App() {
  let { x: mouseX, y: mouseY } = useMousePosition();

  const [connector, setConnector] = useState(null);
  const [time0, setTime0] = useState(0);
  const [const1, setConst1] = useState(0);
  const [math0, setMath0] = useState(0);
  const [const2, setConst2] = useState(0);
  const [math1, setMath1] = useState(0);

  const nodeOutputMap = {
    "time0-o-0": time0,
    "const1-o-0": const1,
    "const2-o-0": const2,
    "math0-o-0": math0,
    "math1-o-0": math1
  };

  const nodeInputMap = {
    math0: [time0, const1],
    math1: [math0, const2],
    value0: [math1]
  };

  const connectConnector = (
    from: { id: string; x: number; y: number },
    to: { id: string; x: number; y: number }
  ) => {
    console.log(`${from.id} to ${to}`);
  };

  const endConnect = () => {
    if (connector) {
      setConnector(null);
    }
  };

  let activeConnectorLine = null;
  if (connector) {
    activeConnectorLine = (
      <line
        x1={connector.x + window.scrollX}
        y1={connector.y + window.scrollY}
        x2={mouseX}
        y2={mouseY}
        strokeWidth="2"
        stroke="#888888"
      />
    );
  }

  return (
    <ConnectorContext.Provider
      value={[connector, setConnector, connectConnector]}
    >
      <svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%">
        <line
          x1="325"
          y1="93"
          x2="375"
          y2="178"
          strokeWidth="2"
          stroke="#888888"
        />
        {activeConnectorLine}
      </svg>
      <div className="Control" onMouseUp={endConnect}>
        <Time id={"time0"} x={10} y={10} output={setTime0} />
        <Const id={"const1"} x={10} y={210} output={setConst1} />
        <Math
          id={"math0"}
          x={360}
          y={95}
          input={nodeInputMap["math0"]}
          output={setMath0}
          op="add"
        />
        <Const id={"const2"} x={10} y={410} output={setConst2} />
        <Math
          id={"math1"}
          x={710}
          y={310}
          input={nodeInputMap["math1"]}
          output={setMath1}
          op="multiply"
        />
        <Value
          id={"value0"}
          x={1060}
          y={210}
          input={nodeInputMap["value0"]}
          output={setOutput}
        />
      </div>
    </ConnectorContext.Provider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
