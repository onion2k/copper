import React, { Suspense, useState, useReducer, useRef } from "react";
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

const Const = React.lazy(() => import("./Panels/const"));
const Time = React.lazy(() => import("./Panels/time"));
const Value = React.lazy(() => import("./Panels/value"));
const Arithmatic = React.lazy(() => import("./Panels/arithmatic"));
const Trig = React.lazy(() => import("./Panels/trig"));
const Shader = React.lazy(() => import("./Panels/shader"));
const Color = React.lazy(() => import("./Panels/color"));
const String = React.lazy(() => import("./Panels/string"));
const Event_MousePosition = React.lazy(() =>
  import("./Panels/Event_MousePosition")
);

const Shader_Color = React.lazy(() => import("./Panels/shaders/color"));

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
  const [panels, setPanels] = useState(init);
  let { x: mouseX, y: mouseY } = useMousePosition();

  let appClass = ["canvas"];
  if (state.connector) {
    appClass.push("active");
  }

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
    switch (p.type) {
      case "constant":
        return (
          <Const
            id={p.id}
            key={p.id}
            title={p.title}
            x={cellSize * p.x}
            y={cellSize * p.y}
          />
        );
      case "time":
        return (
          <Time
            id={p.id}
            key={p.id}
            title={p.title}
            x={cellSize * p.x}
            y={cellSize * p.y}
            initPauseState={true}
          />
        );
      case "arithmatic":
        return (
          <Arithmatic
            id={p.id}
            key={p.id}
            title={p.title}
            x={cellSize * p.x}
            y={cellSize * p.y}
            op={"multiply"}
          />
        );
      case "trig":
        return (
          <Trig
            id={p.id}
            key={p.id}
            title={p.title}
            x={cellSize * p.x}
            y={cellSize * p.y}
          />
        );
      case "string":
        return (
          <String
            id={p.id}
            key={p.id}
            title={p.title}
            x={cellSize * p.x}
            y={cellSize * p.y}
            value={p.value || ""}
          />
        );
      case "shader":
        return (
          <Shader
            id={p.id}
            key={p.id}
            title={p.title}
            x={cellSize * p.x}
            y={cellSize * p.y}
          />
        );
      case "color":
        return (
          <Color
            id={p.id}
            key={p.id}
            title={p.title}
            x={cellSize * p.x}
            y={cellSize * p.y}
          />
        );
      case "value":
        return (
          <Value
            id={p.id}
            key={p.id}
            title={p.title}
            x={cellSize * p.x}
            y={cellSize * p.y}
          />
        );
      case "mousePosition":
        return (
          <Event_MousePosition
            id={p.id}
            key={p.id}
            title={p.title}
            x={cellSize * p.x}
            y={cellSize * p.y}
          />
        );
      case "Shader_Color":
        return (
          <Shader_Color
            id={p.id}
            key={p.id}
            title={p.title}
            x={cellSize * p.x}
            y={cellSize * p.y}
          />
        );
    }
  });

  return (
    <DispatchContext.Provider value={{ dispatch, state }}>
      <HeaderNav addPanel={addPanel} />
      <div className={appClass.join(" ")}>
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
