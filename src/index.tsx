import React, {
  Suspense,
  useState,
  useEffect,
  useReducer,
  useRef
} from "react";
import { render } from "react-dom";

import useMousePosition from "./Hooks/useMousePosition";
import { MouseContext } from "./Contexts/mouse";
import { DispatchContext } from "./Contexts/dispatch";

const LazyConst = React.lazy(() => import("./Panels/const"));
const LazyTime = React.lazy(() => import("./Panels/time"));
const LazyValue = React.lazy(() => import("./Panels/value"));
const LazyArithmatic = React.lazy(() => import("./Panels/arithmatic"));
const LazySin = React.lazy(() => import("./Panels/sin"));
const LazyShader = React.lazy(() => import("./Panels/shader"));
const LazyColor = React.lazy(() => import("./Panels/color"));
const LazyString = React.lazy(() => import("./Panels/string"));

import { ConnectorMap } from "./Components/connectorMap";
import { ConnectorMapLine } from "./Components/connectorMapLine";
import { ActiveConnector } from "./Components/activeConnector";

import { uniqueID } from "./uniqueID";

import { reducer } from "./reducer";

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

const initialState = {
  panels: [],
  inputs: {},
  outputs: {},
  connections: {},
  connectionLines: [],
  nodes: []
};

interface Connection {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  let { x: mouseX, y: mouseY } = useMousePosition();

  const time0 = useRef(uniqueID());
  const const0 = useRef(uniqueID());
  const math0 = useRef(uniqueID());
  const sin0 = useRef(uniqueID());
  const shader0 = useRef(uniqueID());

  return (
    <DispatchContext.Provider value={{ dispatch, state }}>
      <MouseContext.Provider value={[mouseX, mouseY]}>
        <ConnectorMap nodes={state.nodes} connections={state.connectionLines} />
        <Suspense fallback={"Waiting"}>
          <LazyTime
            key={"time0"}
            id={time0.current}
            x={10}
            y={10}
            initPauseState={true}
          />
          <LazyConst key={"const0"} id={const0.current} x={10} y={160} />
          <LazyArithmatic
            key={"math0"}
            id={math0.current}
            x={410}
            y={10}
            op="multiply"
          />
          <LazySin key={"sin0"} id={sin0.current} x={410} y={260} />
          <LazyShader key={"shader0"} id={shader0.current} x={1210} y={10} />
          {/* <LazyValue
            key={"value0"}
            id={useRef(uniqueID()).current}
            x={1210}
            y={10}
          /> */}
          {/* <LazyColor
            key={"color0"}
            id={useRef(uniqueID()).current}
            x={10}
            y={300}
          /> */}
          <LazyString
            id={useRef(uniqueID()).current}
            title="Vertex Shader"
            x={10}
            y={300}
            value={vs}
          />
          <LazyString
            id={useRef(uniqueID()).current}
            title="Fragment Shader"
            x={10}
            y={700}
            value={fs}
          />
        </Suspense>
        <ActiveConnector x={0} y={0} />
      </MouseContext.Provider>
    </DispatchContext.Provider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
