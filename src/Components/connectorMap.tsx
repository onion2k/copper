import React, { useRef, useState, useEffect, useContext } from "react";
import { ConnectorContext } from "../Contexts/connector";

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
  const [connector, setConnector, connectConnector, registerNode] = useContext(
    ConnectorContext
  );

  let connectionsMap = [];
  if (connections.length > 0) {
    connections.forEach((connection, i) => {
      const { x1, y1, x2, y2 } = connection;
      connectionsMap.push(
        <path
          id="Connector"
          key={`${x1}-${y1}-${x2}-${y2}`}
          d={`M${x1 + 10} ${y1 + 10} c ${(x2 - x1) * 0.75} 0, ${(x2 - x1) *
            0.25} ${y2 - y1}, ${x2 - x1} ${y2 - y1}`}
          strokeWidth="2"
          stroke={"#888888"}
          fill={"none"}
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
