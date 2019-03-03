import React, { Suspense, useState, useEffect, useReducer } from "react";
import { render } from "react-dom";

import useMousePosition from "./Hooks/useMousePosition";
import { ConnectorContext } from "./Contexts/connector";

// const Const = React.lazy(() => import("./Panels/const"));

import Const from "./Panels/const";
import { Time } from "./Panels/time";
import { Value } from "./Panels/value";
import { Arithmatic } from "./Panels/arithmatic";
import { Sin } from "./Panels/sin";

import { ConnectorMap } from "./Components/connectorMap";
import { ConnectorMapLine } from "./Components/connectorMapLine";

import { uniqueID } from "./uniqueID.tsx";

const initialState = {
  outputs: {
    time0: 0,
    const1: 0,
    math0: 0,
    value0: 0,
    sin0: 0
  },
  inputs: {
    sin0: [0],
    math0: [0, 0],
    value0: [0]
  },
  connections: {
    sin0: null,
    time0: null,
    const1: null,
    math0: null
  },
  nodes: []
};

import { reducer } from "./reducer.tsx";

import "./styles.css";

function App() {
  let { x: mouseX, y: mouseY } = useMousePosition();

  const [state, dispatch] = useReducer(reducer, initialState);
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [connector, setConnector] = useState(null);
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

  function newPanel(type = "const") {
    const id = uniqueID();
    let panel;

    const props = {
      key: id,
      id: id,
      x: 10,
      y: 320,
      output: value => {
        dispatch({
          type: "update",
          id: id,
          value: value
        });
      }
    };

    switch (type) {
      case "const":
        panel = <Const {...props} />;
        break;
      case "time":
        panel = <Time {...props} />;
        break;
    }

    const tempDynNodes = dynNodes;
    tempDynNodes.push(panel);
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
        <Suspense fallback={"Loading"}>
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
            y={10}
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

          <Sin
            id={"sin0"}
            x={710}
            y={195}
            input={state.inputs["sin0"]}
            output={value => {
              dispatch({
                type: "update",
                id: "sin0",
                value: value
              });
            }}
          />

          <Value
            id={"value0"}
            x={710}
            y={10}
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

          <button onClick={() => newPanel("const")}>New const</button>
          <button onClick={() => newPanel("time")}>New time</button>
        </Suspense>
      </div>
    </ConnectorContext.Provider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
