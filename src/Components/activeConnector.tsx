import React, { useState, useEffect, useRef, useContext } from "react";
import { DispatchContext } from "../Contexts/dispatch";
import { MouseContext } from "../Contexts/mouse";

import { ConnectorMapLine } from "./connectorMapLine";

interface iActiveConnector {
  id?: string;
  x: number;
  y: number;
}

interface iInitPos {
  x: number;
  y: number;
}

export function ActiveConnector({ id, x, y }: iActiveConnector) {
  const { state } = useContext(DispatchContext);
  const [mouseX, mouseY] = useContext(MouseContext);

  if (!state.connector) {
    return null;
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%">
      <ConnectorMapLine
        id={"active"}
        title={""}
        x1={state.connector.x + window.scrollX}
        y1={state.connector.y + window.scrollY}
        x2={mouseX}
        y2={mouseY}
      />
    </svg>
  );
}
