import React from "react";
import { map } from "lodash";
import { ConnectorMapLine } from "./connectorMapLine";

interface iConnectorMap {
  nodes: Array<{
    id: string;
    direction: string;
    index: number;
    x: number;
    y: number;
  }>;
  connections: {
    [s: string]: Array<{
      from: string;
      from_index: number;
      to: string;
      to_index: number;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
    }>;
  };
}

export function ConnectorMap({ nodes, connections }: iConnectorMap) {
  let connectionsMap = new Array<any>();
  map(connections, panel => {
    panel.forEach((connector: any) => {
      const { x1, y1, x2, y2 } = connector;
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
  });

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="5000" width="5000">
      {connectionsMap}
    </svg>
  );
}
