import React, { useState, useEffect, useReducer } from "react";
import { render } from "react-dom";

import useMousePosition from "./Hooks/useMousePosition";
import { ConnectorContext } from "./Contexts/connector";
import { Const } from "./Nodes/const";
import { Time } from "./Nodes/time";
import { Value } from "./Nodes/value";
import { Arithmatic } from "./Nodes/arithmatic";

import { ConnectorMap } from "./Components/connectorMap";
import { ConnectorMapLine } from "./Components/connectorMapLine";

function uniqueID() {
  function chr4() {
    return Math.random()
      .toString(16)
      .slice(-4);
  }
  return chr4() + "-" + chr4() + "-" + chr4() + "-" + chr4();
}

import "./styles.css";

const initialState = {
  outputs: {
    time0: 0,
    const1: 0,
    math0: 0,
    value0: 0
  },
  inputs: {
    math0: [0, 0],
    value0: [0]
  },
  connections: {
    time0: null,
    const1: null,
    math0: null
  },
  nodes: []
};

function reducer(state, action) {
  const newState = { ...state };
  let connection;
  switch (action.type) {
    case "update":
      newState.outputs[action.id] = action.value;
      connection = newState.connections[action.id];
      if (connection) {
        newState.inputs[connection.id][connection.index] = action.value;
      }
      return newState;
    case "connect":
      newState.connections[action.from] = {
        id: action.to,
        index: action.index
      };
      connection = newState.connections[action.from];
      newState.inputs[connection.id][connection.index] =
        newState.outputs[action.from];
      return newState;
    case "register":
      break;
    default:
      throw new Error();
  }
}

function App() {
  let { x: mouseX, y: mouseY } = useMousePosition();

  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [connector, setConnector] = useState(null);

  const [state, dispatch] = useReducer(reducer, initialState);

  const [dynNodes, setDynNodes] = useState([]);

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

  function newConst() {
    const id = uniqueID();
    const const2 = (
      <Const
        key={id}
        id={id}
        x={10}
        y={320}
        output={value => {
          dispatch({
            type: "update",
            id: id,
            value: value
          });
        }}
      />
    );

    const tempDynNodes = dynNodes;
    tempDynNodes.push(const2);
    setDynNodes(tempDynNodes);
  }

  function newTime() {
    const id = uniqueID();
    const const2 = (
      <Time
        key={id}
        id={id}
        x={10}
        y={320}
        output={value => {
          dispatch({
            type: "update",
            id: id,
            value: value
          });
        }}
      />
    );

    const tempDynNodes = dynNodes;
    tempDynNodes.push(const2);
    setDynNodes(tempDynNodes);
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
          y={160}
          output={value => {
            dispatch({
              type: "update",
              id: "const1",
              value: value
            });
          }}
        />
        <Arithmatic
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
          op="multiply"
        />
        <Value
          id={"value0"}
          x={760}
          y={95}
          input={state.inputs["value0"]}
          output={value => {
            dispatch({
              type: "update",
              id: "value0",
              value: value
            });
          }}
        />
        {dynNodes.map(node => {
          return node;
        })}

        <button onClick={newConst}>New const</button>
        <button onClick={newTime}>New time</button>
      </div>
    </ConnectorContext.Provider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
