import React, { useState, useEffect, useReducer } from "react";
import { render } from "react-dom";

import useMousePosition from "./Hooks/useMousePosition";
import { ConnectorContext } from "./Contexts/connector";
import { Const } from "./Nodes/const";
import { Time } from "./Nodes/time";
import { Value } from "./Nodes/value";
import { Math } from "./Nodes/math";

import { ConnectorMap } from "./Components/connectorMap";
import { ConnectorMapLine } from "./Components/connectorMapLine";

import "./styles.css";

const initialState = {
  outputs: {
    time0: 0,
    const1: 0,
    math0: 0
  },
  inputs: {
    math0: [0, 0]
  },
  connections: {
    time0: null,
    const1: null
  }
};

function reducer(state, action) {
  const newState = { ...state };
  switch (action.type) {
    case "update":
      newState.outputs[action.id] = action.value;
      if (newState.connections[action.id]) {
        newState.inputs[newState.connections[action.id].id][
          newState.connections[action.id].index
        ] = action.value;
      }
      return newState;
    case "connect":
      newState.connections[action.from] = {
        id: action.to,
        index: action.index
      };
      return newState;
    default:
      throw new Error();
  }
}

function App() {
  let { x: mouseX, y: mouseY } = useMousePosition();

  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [connector, setConnector] = useState(null);

  const [time0, setTime0] = useState(0);
  const [const1, setConst1] = useState(0);
  const [math0, setMath0] = useState(0);

  // const outputs: { [id: string]: string } = {
  //   time0: time0,
  //   const1: const1
  // };

  // const nodeInputMap = {
  //   math0: [null, null]
  // };

  const [state, dispatch] = useReducer(reducer, initialState);

  const connectConnector = (to: {
    id: string;
    direction: string;
    index: number;
    key: string;
    x: number;
    y: number;
  }) => {
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

    dispatch({
      type: "connect",
      from: connector.id,
      to: to.id,
      index: to.index
    });
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
      <ConnectorMapLine
        x1={connector.x + window.scrollX}
        y1={connector.y + window.scrollY}
        x2={mouseX}
        y2={mouseY}
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
          output={value => {
            dispatch({
              type: "update",
              id: "time0",
              value: value
            });
          }}
          initPauseState={true}
        />
        <Const
          id={"const1"}
          x={10}
          y={210}
          output={value => {
            dispatch({
              type: "update",
              id: "const1",
              value: value
            });
          }}
        />
        <Math
          id={"math0"}
          x={360}
          y={95}
          input={state.inputs["math0"]}
          output={value => {
            dispatch({
              type: "update",
              id: "math0",
              value: value
            });
          }}
          op="add"
        />
      </div>
    </ConnectorContext.Provider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
