import React, {
  Suspense,
  useState,
  useEffect,
  useReducer,
  useRef
} from "react";
import { render } from "react-dom";

import useMousePosition from "./Hooks/useMousePosition";
import { ConnectorContext } from "./Contexts/connector";
import { MouseContext } from "./Contexts/mouse";
import { DispatchContext } from "./Contexts/dispatch";

import Const from "./Panels/const";
import { Time } from "./Panels/time";
import { Value } from "./Panels/value";
import { Arithmatic } from "./Panels/arithmatic";
import { Sin } from "./Panels/sin";

import { ConnectorMap } from "./Components/connectorMap";
import { ConnectorMapLine } from "./Components/connectorMapLine";

import { uniqueID } from "./uniqueID";

import { reducer } from "./reducer";
const initialState = {
  panels: [],
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
  connectionsNew: {},
  connectionLines: [],
  nodes: []
};

import "./styles.css";

interface Node {
  id: string;
  x: number;
  y: number;
  direction: string;
  index: number;
}

interface Connection {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

function App() {
  let { x: mouseX, y: mouseY } = useMousePosition();

  const [state, dispatch] = useReducer(reducer, initialState);
  // const [nodes, setNodes] = useState(Array<Node>());
  const [connections, setConnections] = useState(Array<Connection>());
  const [connector, setConnector] = useState<Node | null>(null);

  const connectConnector = (to: {
    id: string;
    direction: string;
    index: number;
    key: string;
    x: number;
    y: number;
  }) => {
    if (!connector) {
      return;
    }

    const { id, direction, index } = connector;

    const start = state.nodes.find(
      (node: { id: string; direction: string; index: number }) => {
        return (
          node.id === id && node.direction === direction && node.index === index
        );
      }
    );

    const end = state.nodes.find(
      (node: { id: string; direction: string; index: number }) => {
        return (
          node.id === to.id &&
          node.direction === to.direction &&
          node.index === to.index
        );
      }
    );

    if (start && end) {
      dispatch({
        type: "connect",
        from: connector.id,
        to: to.id,
        index: to.index,
        x1: start.x,
        y1: start.y,
        x2: end.x,
        y2: end.y
      });
    }
  };

  const endConnect = () => {
    if (connector) {
      setConnector(null);
    }
  };

  let activeConnectorLine = null;
  if (connector) {
    // disconnect if input, multiple if output?
    // this happens on every render...
    activeConnectorLine = (
      <svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%">
        <ConnectorMapLine
          id={"active"}
          title={"title"}
          x1={connector.x + window.scrollX}
          y1={connector.y + window.scrollY}
          x2={mouseX}
          y2={mouseY}
        />
      </svg>
    );
  }

  const time0id = useRef(uniqueID());

  return (
    <DispatchContext.Provider value={dispatch}>
      <MouseContext.Provider value={[mouseX, mouseY]}>
        <ConnectorContext.Provider
          value={[connector, setConnector, connectConnector]}
        >
          {activeConnectorLine}

          <ConnectorMap
            nodes={state.nodes}
            connections={state.connectionLines}
          />

          <div className="Control" onMouseUp={endConnect}>
            <Suspense fallback={"Loading"}>
              <Time id={time0id.current} x={10} y={10} initPauseState={true} />
              <Const id={"const1"} x={10} y={160} />
              <Arithmatic
                id={"math0"}
                x={410}
                y={10}
                input={state.inputs["math0"]}
                op="multiply"
              />
              <Sin id={"sin0"} x={810} y={10} input={state.inputs["sin0"]} />
              <Value
                id={"value0"}
                x={1210}
                y={10}
                input={state.inputs["value0"]}
              />
            </Suspense>
          </div>
        </ConnectorContext.Provider>
      </MouseContext.Provider>
    </DispatchContext.Provider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
