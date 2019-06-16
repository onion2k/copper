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
import { ActiveConnector } from "./Components/activeConnector";

import { uniqueID } from "./uniqueID";

import { reducer } from "./reducer";
const initialState = {
  panels: [],
  inputs: {},
  outputs: {},
  connections: {},
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

  // const [connections, setConnections] = useState(Array<Connection>());
  // const [connector, setConnector] = useState<Node | null>(null);

  // const connectConnector = (to: {
  //   id: string;
  //   direction: string;
  //   index: number;
  //   key: string;
  //   x: number;
  //   y: number;
  // }) => {
  //   if (!connector) {
  //     return;
  //   }

  //   const { id, direction, index } = connector;

  //   const start = state.nodes.find(
  //     (node: { id: string; direction: string; index: number }) => {
  //       return (
  //         node.id === id && node.direction === direction && node.index === index
  //       );
  //     }
  //   );

  //   const end = state.nodes.find(
  //     (node: { id: string; direction: string; index: number }) => {
  //       return (
  //         node.id === to.id &&
  //         node.direction === to.direction &&
  //         node.index === to.index
  //       );
  //     }
  //   );

  //   if (start && end) {
  //     dispatch({
  //       type: "connector/connect",
  //       from: connector.id,
  //       to: to.id,
  //       index: to.index,
  //       x1: start.x,
  //       y1: start.y,
  //       x2: end.x,
  //       y2: end.y
  //     });
  //   }
  // };

  // const endConnect = () => {
  //   if (connector) {
  //     setConnector(null);
  //   }
  // };

  const time0 = useRef(uniqueID());
  const const0 = useRef(uniqueID());
  const math0 = useRef(uniqueID());
  const sin0 = useRef(uniqueID());
  const value0 = useRef(uniqueID());

  const const1 = useRef(uniqueID());
  const value1 = useRef(uniqueID());

  return (
    <DispatchContext.Provider value={dispatch}>
      <MouseContext.Provider value={[mouseX, mouseY]}>
        <ConnectorMap nodes={state.nodes} connections={state.connectionLines} />
        <div
          className="Control"
          onMouseUp={() => {
            //dispatch end connect
          }}
        >
          <Suspense fallback={"Loading"}>
            {/* <Time id={time0.current} x={10} y={10} initPauseState={true} />
            <Const id={const0.current} x={10} y={160} />
            <Arithmatic
              id={math0.current}
              x={410}
              y={10}
              op="multiply"
              state={state}
            />
            <Sin id={sin0.current} x={810} y={10} />
            <Value id={value0.current} x={1210} y={10} /> */}

            <Const id={const1.current} x={80} y={160} />
            <Value id={value1.current} x={510} y={160} />
          </Suspense>
        </div>
        <ActiveConnector x={0} y={0} />
      </MouseContext.Provider>
    </DispatchContext.Provider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
