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
      connectionsMap.push(
        <line
          key={`${connection.x1}-${connection.y1}-${connection.x2}-${
            connection.y2
          }-`}
          x1={connection.x1 + 10}
          y1={connection.y1 + 10}
          x2={connection.x2 + 10}
          y2={connection.y2 + 10}
          stroke={"#888888"}
          strokeWidth="2"
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
