import React, { useContext } from "react";
import { DispatchContext } from "../Contexts/dispatch";
import { MouseContext } from "../Contexts/mouse";

import { ConnectorMapLine } from "./connectorMapLine";

interface iActiveConnector {
  x?: number;
  y?: number;
}

export function ActiveConnector({ x = 0, y = 0 }: iActiveConnector) {
  const { state } = useContext(DispatchContext);
  const [mouseX, mouseY, posx, posy] = useContext(MouseContext);

  if (!state.connector) {
    return null;
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="5000px" width="5000px">
      <ConnectorMapLine
        id={"active"}
        title={""}
        x1={state.connector.x + window.scrollX}
        y1={state.connector.y + window.scrollY}
        x2={mouseX + (2500 - posx)}
        y2={mouseY + (2500 - posy)}
      />
    </svg>
  );
}
