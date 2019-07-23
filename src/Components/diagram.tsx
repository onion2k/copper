import React, { useContext, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DispatchContext } from "../Contexts/dispatch";

import { findIconDefinition } from "@fortawesome/fontawesome-svg-core";

import PRIMITIVES from "../Panels/primitives";
import OPERATIONS from "../Panels/operations";
import EVENTS from "../Panels/events";
import SHADERS from "../Panels/shaders";
import OUTPUTS from "../Panels/outputs";

const loading = findIconDefinition({ prefix: "fas", iconName: "cog" });
const closeIcon = findIconDefinition({ prefix: "fas", iconName: "times" });

const panelTypes: { [s: string]: any } = Object.assign(
  PRIMITIVES,
  OPERATIONS,
  EVENTS,
  SHADERS,
  OUTPUTS
);

const emptyPanel = (p: any) => (
  <article className="Panel" style={{ top: p.y, left: p.x }}>
    <header className="Title">
      <div className="indicator close">
        <FontAwesomeIcon icon={closeIcon} size="xs" />
      </div>
      <span>Loading {p.title}</span>
      <div className="indicators" />
    </header>
    <div className="controls">
      <div className="knobs placeholder">
        <FontAwesomeIcon icon={loading} size={"5x"} className="fa-spin" />
      </div>
    </div>
  </article>
);

export function Diagram() {
  const { state } = useContext(DispatchContext);

  const panelsEl = state.canvas.map((p: any) => {
    const preloadingPanel = React.createElement(emptyPanel, {
      title: p.title,
      x: p.x,
      y: p.y
    });

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
    return (
      <Suspense fallback={preloadingPanel} key={p.id}>
        {panel}
      </Suspense>
    );
  });

  return <>{panelsEl}</>;
}
