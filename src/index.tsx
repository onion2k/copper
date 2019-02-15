import React, { useState, useEffect } from "react";
import { render } from "react-dom";

import useMousePosition from "./Hooks/useMousePosition";
import { ConnectorContext } from "./Contexts/connector";
import { Const } from "./Nodes/const";
import { Time } from "./Nodes/time";
import { Value } from "./Nodes/value";
import { Math } from "./Nodes/math";

import { ConnectorMap } from "./Components/connectorMap";

import "./styles.css";

function setOutput(output: any) {}

function App() {
  let { x: mouseX, y: mouseY } = useMousePosition();

  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [connector, setConnector] = useState(null);

  const [time0, setTime0] = useState(0);
  const [const1, setConst1] = useState(0);
  const [math0, setMath0] = useState(0);
  const [const2, setConst2] = useState(0);
  const [math1, setMath1] = useState(0);
  const [value0, setValue0] = useState(0);

  const outputs: { [id: string]: string } = {
    time0: "math0",
    const1: "math0",
    const2: "math1",
    math0: "math1",
    math1: "value0",
    value0: null
  };

  const nodeInputMap = {
    math0: ["time0", "const1"],
    math1: ["math0", "const2"],
    value0: ["math1"]
  };

  useEffect(
    () => {
      if (nodes.length > 0) {
        Object.keys(outputs).forEach((key: string) => {
          const n = nodes.find(node => {
            return key === node.id;
          });
          // console.log(n);
        });
      }
    },
    [nodes]
  );

  const connectConnector = (to: {
    id: string;
    direction: string;
    index: number;
    key: string;
    x: number;
    y: number;
  }) => {
    // console.log(`${connector.key} to ${to.key}`);
    const start = nodes.find(node => {
      return (
        node.id === connector.id &&
        node.direction === connector.direction &&
        node.index === connector.index
      );
    });
    const end = nodes.find(node => {
      return (
        node.id === to.id &&
        node.direction === to.direction &&
        node.index === to.index
      );
    });
    const tempConnections = connections;
    connections.push({
      x1: start.x,
      y1: start.y,
      x2: end.x,
      y2: end.y
    });
    setConnections(connections);
  };

  const registerNode = node => {
    const newNodes = nodes;
    newNodes.push(node);
    setNodes(newNodes);
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
      value={[connector, setConnector, connectConnector, registerNode]}
    >
      <svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%">
        {activeConnectorLine}
      </svg>

      <ConnectorMap nodes={nodes} connections={connections} />

      <div className="Control" onMouseUp={endConnect}>
        <Time
          id={"time0"}
          x={10}
          y={10}
          output={setTime0}
          initPauseState={true}
        />
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
