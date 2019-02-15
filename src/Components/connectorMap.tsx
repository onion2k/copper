import React, { useRef, useState, useEffect, useContext } from "react";
import { ConnectorContext } from "../Contexts/connector";

interface iConnectorMap {
  nodes: Array<{ id: string; x: number; y: number }>;
  connections: Array<{ x1: number; y1: number; x2: number; y2: number }>;
}

export function ConnectorMap({ nodes, connections }: iConnectorMap) {
  const [connector, setConnector, connectConnector, registerNode] = useContext(
    ConnectorContext
  );

  // useEffect(
  //   () => {
  //     console.log(nodes.length);
  //   },
  //   [nodes]
  // );

  let nodeMap = [];
  if (nodes.length > 0) {
    nodes.forEach((node, i) => {
      nodeMap.push(
        <circle key={node.id} cx={node.x + 10} cy={node.y + 10} r="20" />
      );
    });
  }

  let connectionsMap = [];
  if (connections.length > 0) {
    connections.forEach((connection, i) => {
      connectionsMap.push(
        <line
          x1={connection.x1}
          y1={connection.y1}
          x2={connection.x2}
          y2={connection.y1}
        />
      );
    });
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%">
      {nodeMap}
      {connectionsMap}
    </svg>
  );
}
