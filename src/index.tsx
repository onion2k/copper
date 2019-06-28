import React, {
  Suspense,
  useState,
  useReducer,
  useRef,
  useEffect
} from "react";
import { render } from "react-dom";

const initialState = {
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
import EVENTS from "./Panels/events";
import SHADERS from "./Panels/shaders";

const panelTypes: { [s: string]: any } = Object.assign(
  PRIMITIVES,
  EVENTS,
  SHADERS
);

import { HeaderNav } from "./Components/headerNav";
import { ActiveConnector } from "./Components/activeConnector";
import { ConnectorMap } from "./Components/connectorMap";

import { uniqueID } from "./uniqueID";

import "./styles.css";

const cellSize = 100;

const init: {
  id: string;
  type: string;
  title: string;
  x: number;
  y: number;
  value?: any;
}[] = [];

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  let { x: mouseX, y: mouseY } = useMousePosition();
  const [panels, setPanels] = useState(init);
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

  const addPanel = (type: string) => {
    const tempPanels = [...panels];
    tempPanels.push({
      id: uniqueID(),
      type: type,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      x: 1,
      y: 1
    });
    setPanels(tempPanels);
  };

  const panelsEl = panels.map((p: any) => {
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
