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
const Sin = React.lazy(() => import("./Panels/sin"));
const Shader = React.lazy(() => import("./Panels/shader"));
const Color = React.lazy(() => import("./Panels/color"));
const String = React.lazy(() => import("./Panels/string"));

import { ConnectorMap } from "./Components/connectorMap";
import { ActiveConnector } from "./Components/activeConnector";

import { uniqueID } from "./uniqueID";

import "./styles.css";

const fs = `#ifdef GL_ES
  precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

void main()
{
  // Normalized pixel coordinates (from 0 to 1)
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  // Time varying pixel color
  vec3 col = 0.5 + 0.5*cos(u_time + uv.xyx + vec3(0,2,4));

  // Output to screen
  gl_FragColor = vec4(col,1.0);
}`;

const vs = `attribute vec4 position;
void main() {
  gl_Position = position;
}
`;

const cellSize = 100;

const init: {
  id: string;
  type: string;
  title: string;
  x: number;
  y: number;
}[] = [
  {
    type: "constant",
    id: "c1",
    title: "Constant 1",
    x: 1,
    y: 3
  }
];

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [panels, setPanels] = useState(init);
  let { x: mouseX, y: mouseY } = useMousePosition();

  let appClass = ["canvas"];

  if (state.connector) {
    appClass.push("active");
  }

  const addConstantPanel = () => {
    const tempPanels = panels;
    tempPanels.push({
      id: uniqueID(),
      type: "constant",
      title: "Constant",
      x: 1,
      y: 1
    });
    setPanels(tempPanels);
  };

  const panelsEl = panels.map(p => (
    <Const
      id={p.id}
      key={p.id}
      title={p.title}
      x={cellSize * p.x}
      y={cellSize * p.y}
    />
  ));

  return (
    <DispatchContext.Provider value={{ dispatch, state }}>
      <header className="nav">
        Copper Header
        <ul className="addPanel">
          <li>
            <button onClick={addConstantPanel}>Add Const</button>
          </li>
        </ul>
      </header>
      <div className={appClass.join(" ")}>
        <MouseContext.Provider value={[mouseX, mouseY]}>
          <ConnectorMap
            nodes={state.nodes}
            connections={state.connectionLines}
          />
          <Suspense fallback={"Waiting"}>
            <Time
              key={"time0"}
              id={useRef(uniqueID()).current}
              x={cellSize * 1}
              y={cellSize * 6}
              initPauseState={true}
            />
            {/* <Const key={"const0"} id={useRef(uniqueID()).current} x={10} y={160} /> */}
            <Arithmatic
              key={"math0"}
              id={useRef(uniqueID()).current}
              x={cellSize * 7}
              y={cellSize * 1}
              op="multiply"
            />
            {/* <Sin
              key={"sin0"}
              id={useRef(uniqueID()).current}
              x={cellSize * 5}
              y={cellSize * 3}
            /> */}
            {/* <Shader
              key={"shader0"}
              id={useRef(uniqueID()).current}
              x={cellSize * 9}
              y={cellSize * 1}
            /> */}
            {/* <Value
              key={"value0"}
              id={useRef(uniqueID()).current}
              x={1210}
              y={10}
            /> */}
            {/* <Color
              key={"color0"}
              id={useRef(uniqueID()).current}
              x={10}
              y={300}
            /> */}
            {/* <String
              id={useRef(uniqueID()).current}
              title="Vertex Shader"
              x={cellSize * 1}
              y={cellSize * 6}
              value={vs}
            /> */}
            {/* <String
              id={useRef(uniqueID()).current}
              title="Fragment Shader"
              x={cellSize * 5}
              y={cellSize * 6}
              value={fs}
            /> */}
            {panelsEl}
          </Suspense>
          <ActiveConnector x={0} y={0} />
        </MouseContext.Provider>
      </div>
    </DispatchContext.Provider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
