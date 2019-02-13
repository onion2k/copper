import React, { useState, useEffect, useContext } from "react";
import { ConnectorContext } from "../Contexts/connector";

interface iConnector {
  connectorKey: string;
}

export function Connector({ connectorKey }: iConnector) {
  const [connector, setConnector, connectConnector] = useContext(
    ConnectorContext
  );

  const startConnect = () => {
    setConnector(connectorKey);
  };

  const endConnect = (e: any) => {
    e.preventDefault();
    if (connector) {
      connectConnector(connector, connectorKey);
      setConnector(null);
    }
  };

  return (
    <div
      className={`node ${connector === connectorKey ? "connecting" : ""}`}
      onMouseDown={startConnect}
      onMouseUp={endConnect}
    />
  );
}
