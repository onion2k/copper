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

import { HeaderNav } from "./Components/headerNav";
import { Diagram } from "./Components/diagram";
import { ActiveConnector } from "./Components/activeConnector";
import { ConnectorMap } from "./Components/connectorMap";

import { uniqueID } from "./uniqueID";

import "./styles.css";

const initPanels: {
  id: string;
  type: string;
  x: number;
  y: number;
  title?: string;
  value?: any;
}[] = [
  {
    id: "hn",
    type: "EVENT_MousePosition",
    x: 26,
    y: 27
  },
  { id: "x", type: "SPLIT", x: 31, y: 27 }
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
  const [center, setCenter] = useState({ x: 2500, y: 2500 });
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (dragging) {
      let deltaX = mouseX - initPos.x;
      let deltaY = mouseY - initPos.y;
      if (pos.x + deltaX > center.x) {
        deltaX = delta.x;
      }
      if (pos.y + deltaY > center.y) {
        deltaY = delta.y;
      }
      setDelta({ x: deltaX, y: deltaY });
    }
  }, [dragging, mouseX, mouseY]);

  const addPanel = (type: string, x?: number, y?: number, value?: any) => {
    dispatch({
      type: "panel/add",
      id: uniqueID(),
      panelType: type,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      x: x || 26,
      y: y || 26,
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

  let appClass = ["canvas"];

  if (state.connector) {
    appClass.push("active");
  }

  return (
    <DispatchContext.Provider value={{ dispatch, state }}>
      <HeaderNav addPanel={addPanel} />
      <MouseContext.Provider value={[mouseX, mouseY, pos.x, pos.y]}>
        <div
          className={appClass.join(" ")}
          onMouseDown={(e: React.MouseEvent) => {
            setDragging(true);
            setInitPos({ x: e.clientX, y: e.clientY });
          }}
          onMouseUp={e => {
            if (state.connector) {
              dispatch({
                type: "node/disconnect"
              });
            } else {
              setDragging(false);
              const x = Math.min(pos.x + delta.x, center.x);
              const y = Math.min(pos.y + delta.y, center.y);
              setPos({ x, y });
              setDelta({ x: 0, y: 0 });
            }
          }}
          style={{
            top: pos.y + delta.y - center.y,
            left: pos.x + delta.x - center.x
          }}
        >
          <ConnectorMap
            nodes={state.nodes}
            connections={state.connectionLines}
          />
          <Diagram />
          <ActiveConnector />
        </div>
      </MouseContext.Provider>
    </DispatchContext.Provider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
