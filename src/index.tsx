import React, {
  Suspense,
  useState,
  useReducer,
  useRef,
  useEffect
} from "react";
import { render } from "react-dom";

import "./icons";

const initialState = {
  canvas: [],
  panels: [],
  inputs: {},
  outputs: {},
  connections: {},
  connectionLines: [],
  nodes: []
};

import { reducer } from "./reducer";

import useMousePosition from "./Hooks/useMousePosition";
import { MouseContext } from "./Contexts/mouse";
import { DispatchContext } from "./Contexts/dispatch";

import PRIMITIVES from "./Panels/primitives";
import OPERATIONS from "./Panels/operations";
import EVENTS from "./Panels/events";
import SHADERS from "./Panels/shaders";
import OUTPUTS from "./Panels/outputs";

const panelTypes: { [s: string]: any } = Object.assign(
  PRIMITIVES,
  OPERATIONS,
  EVENTS,
  SHADERS,
  OUTPUTS
);

import { HeaderNav } from "./Components/headerNav";
import { ActiveConnector } from "./Components/activeConnector";
import { ConnectorMap } from "./Components/connectorMap";

import { uniqueID } from "./uniqueID";

import "./styles.css";

const cellSize = 100;

const initPanels: {
  id: string;
  type: string;
  x: number;
  y: number;
  title?: string;
  value?: any;
}[] = [
  { id: "hn", type: "EVENT_Http", x: 1, y: 2 },
  { id: "uniforms", type: "UNIFORMS", x: 6, y: 2 },
  {
    id: "template",
    type: "TEMPLATE",
    x: 11,
    y: 2,
    value: "Hello <%= id %>. Karma: <%= karma %>"
  }
];

const initConnectors: {
  from: string;
  to: string;
}[] = [{ from: "hn", to: "uniforms" }];

function App() {
  const { x: mouseX, y: mouseY } = useMousePosition();

  const [state, dispatch] = useReducer(reducer, initialState);
  const [dragging, setDragging] = useState(false);

  const [initPos, setInitPos] = useState({ x: 0, y: 0 });
  const [delta, setDelta] = useState({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (dragging) {
      const deltaX = mouseX - initPos.x;
      const deltaY = mouseY - initPos.y;
      setDelta({ x: deltaX, y: deltaY });
    }
  }, [dragging, mouseX, mouseY]);

  const addPanel = (type: string, x?: number, y?: number, value?: any) => {
    dispatch({
      type: "panel/add",
      id: uniqueID(),
      panelType: type,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      x: x || 1,
      y: y || 1,
      value: value || null
    });
  };

  const addConnector = (from: string, to: string) => {
    dispatch({
      type: "node/connect",
      from,
      to
    });
  };

  useEffect(() => {
    if (initPanels.length > 0) {
      initPanels.map(p => {
        addPanel(p.type, p.x, p.y, p.value);
      });
    }
    // if (initConnectors.length > 0) {
    //   initConnectors.map(c => {
    //     addConnector(c.type, c.x, c.y);
    //   });
    // }
  }, []);

  const panelsEl = state.canvas.map((p: any) => {
    return React.createElement(
      panelTypes[p.type].el,
      Object.assign(
        {},
        {
          id: p.id,
          key: p.id,
          title: p.title,
          x: cellSize * p.x,
          y: cellSize * p.y,
          value: p.value
        },
        panelTypes[p.type].defaults
      )
    );
  });

  let appClass = ["canvas"];

  if (state.connector) {
    appClass.push("active");
  }

  return (
    <DispatchContext.Provider value={{ dispatch, state }}>
      <HeaderNav addPanel={addPanel} />
      <div
        className={appClass.join(" ")}
        onMouseDown={(e: React.MouseEvent) => {
          setDragging(false);
          setInitPos({ x: e.clientX, y: e.clientY });
        }}
        onMouseUp={e => {
          setDragging(false);
          setPos({ x: pos.x + delta.x, y: pos.y + delta.y });
          setDelta({ x: 0, y: 0 });
        }}
        style={{ top: pos.y + delta.y, left: pos.x + delta.x }}
      >
        <MouseContext.Provider value={[mouseX, mouseY]}>
          <ConnectorMap
            nodes={state.nodes}
            connections={state.connectionLines}
          />
          <Suspense fallback={"Waiting"}>{panelsEl}</Suspense>
          <ActiveConnector x={0} y={0} />
        </MouseContext.Provider>
      </div>
    </DispatchContext.Provider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
