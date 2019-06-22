import React, { Suspense, useReducer, useRef } from "react";
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

const panels = [
  { type: "constant", id: "c1", title: "Constant 1", x: 10, y: 160 }
];

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  let { x: mouseX, y: mouseY } = useMousePosition();

  let appClass = ["canvas"];
  if (state.connector) {
    appClass.push("active");
  }

  return (
    <DispatchContext.Provider value={{ dispatch, state }}>
      <header>Copper Header</header>
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
              x={10}
              y={10}
              initPauseState={true}
            />
            {/* <Const key={"const0"} id={useRef(uniqueID()).current} x={10} y={160} /> */}
            <Arithmatic
              key={"math0"}
              id={useRef(uniqueID()).current}
              x={410}
              y={10}
              op="multiply"
            />
            <Sin key={"sin0"} id={useRef(uniqueID()).current} x={410} y={260} />
            <Shader
              key={"shader0"}
              id={useRef(uniqueID()).current}
              x={1210}
              y={10}
            />
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
            <String
              id={useRef(uniqueID()).current}
              title="Vertex Shader"
              x={10}
              y={300}
              value={vs}
            />
            <String
              id={useRef(uniqueID()).current}
              title="Fragment Shader"
              x={10}
              y={700}
              value={fs}
            />
            {panels.map(p => {
              return (
                <Const
                  id={useRef(p.id || uniqueID()).current}
                  title={p.title}
                  x={p.x}
                  y={p.y}
                />
              );
            })}
          </Suspense>
          <ActiveConnector x={0} y={0} />
        </MouseContext.Provider>
      </div>
    </DispatchContext.Provider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
