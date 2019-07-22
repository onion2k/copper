import React, { useContext, Suspense } from "react";
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

export function Diagram() {
  const { state } = useContext(DispatchContext);

  const panelsEl = state.canvas.map((p: any) => {
    const panel = React.createElement(
      panelTypes[p.type].el,
      Object.assign(
        {},
        {
          id: p.id,
          key: p.id,
          title: p.title,
          x: p.x,
          y: p.y,
          value: p.value
        },
        panelTypes[p.type].defaults
      )
    );
    return <Suspense fallback={"Waiting"}>{panel}</Suspense>;
  });

  return <>{panelsEl}</>;
}
