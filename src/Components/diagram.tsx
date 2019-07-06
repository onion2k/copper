import React, { Suspense, useContext } from "react";
import { DispatchContext } from "../Contexts/dispatch";

import PRIMITIVES from "../Panels/primitives";
import OPERATIONS from "../Panels/operations";
import EVENTS from "../Panels/events";
import SHADERS from "../Panels/shaders";
import OUTPUTS from "../Panels/outputs";

const panelTypes: { [s: string]: any } = Object.assign(
  PRIMITIVES,
  OPERATIONS,
  EVENTS,
  SHADERS,
  OUTPUTS
);

const cellSize = 100;

export function Diagram({}) {
  const { state } = useContext(DispatchContext);

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

  return <Suspense fallback={"Waiting"}>{panelsEl}</Suspense>;
}
