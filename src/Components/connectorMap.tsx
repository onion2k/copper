import React, { useRef, useState, useEffect, useContext } from "react";
import { ConnectorMapLine } from "./connectorMapLine";

interface iConnectorMap {
  nodes: Array<{
    id: string;
    direction: string;
    index: number;
    x: number;
    y: number;
  }>;
  connections: Array<{ x1: number; y1: number; x2: number; y2: number }>;
}

export function ConnectorMap({ nodes, connections }: iConnectorMap) {
  let connectionsMap = new Array<any>();
  if (connections.length > 0) {
    connections.forEach(connection => {
      const { x1, y1, x2, y2 } = connection;
      connectionsMap.push(
        <ConnectorMapLine
          key={`${x1}-${y1}-${x2}-${y2}`}
          title={""}
          id="Connector"
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
        />
      );
    });
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%">
      {connectionsMap}
    </svg>
  );
}
