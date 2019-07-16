import React, { useState, useReducer, useEffect, useCallback } from "react";
import { render } from "react-dom";

import "./icons";

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

const initialState = {
  canvas: [],
  panels: [],
  inputs: {},
  outputs: {},
  connections: {},
  connectionLines: [],
  nodes: []
};

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
    type: "TIME",
    x: 2600,
    y: 2700
  },
  { id: "x", type: "DUPLICATE", x: 3100, y: 2700 }
];

const initConnectors: {
  from: string;
  from_index: number;
  to: string;
  to_index: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}[] = [
  {
    from: "hn",
    from_index: 0,
    to: "x",
    to_index: 0,
    x1: 200,
    y1: 200,
    x2: 400,
    y2: 400
  }
];

function App() {
  const { x: mouseX, y: mouseY } = useMousePosition();

  const [state, dispatch] = useReducer(reducer, initialState);
  const [dragging, setDragging] = useState(false);

  const [initPos, setInitPos] = useState({ x: 0, y: 0 });
  const [delta, setDelta] = useState({ x: 0, y: 0 });
  const [center] = useState({ x: 2500, y: 2500 });
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
  }, [dragging, mouseX, mouseY, initPos, center, delta, pos, state]);

  const addPanel = useCallback(
    (type: string, id?: string, x?: number, y?: number, value?: any) => {
      const newX = x || 2500 - pos.x + 200; // 200 should be screen.x / 2
      const newY = y || 2500 - pos.y + 200; // 200 should be screen.y / 2
      dispatch({
        type: "panel/add",
        id: id || uniqueID(),
        panelType: type,
        title: type.charAt(0).toUpperCase() + type.slice(1),
        x: x || newX,
        y: y || newY,
        value: value || null
      });
    },
    [dispatch, pos]
  );

  const addConnector = (
    from: string,
    from_index: number,
    to: string,
    to_index: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    dispatch({
      type: "node/quickConnect",
      from,
      from_index,
      to,
      to_index,
      x1,
      y1,
      x2,
      y2
    });
  };

  useEffect(() => {
    if (initPanels.length > 0) {
      initPanels.forEach(p => {
        addPanel(p.type, p.id, p.x, p.y, p.value);
      });
    }
    if (initConnectors.length > 0) {
      initConnectors.forEach(c => {
        addConnector(
          c.from,
          c.from_index,
          c.to,
          c.to_index,
          c.x1,
          c.y1,
          c.x2,
          c.y1
        );
      });
    }
    // eslint-disable-next-line
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
