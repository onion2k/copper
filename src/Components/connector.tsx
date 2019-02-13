import React, { useRef, useState, useEffect, useContext } from "react";
import { ConnectorContext } from "../Contexts/connector";

interface iConnector {
  connectorKey: string;
}

export function Connector({ connectorKey }: iConnector) {
  const [connector, setConnector, connectConnector] = useContext(
    ConnectorContext
  );

  const ref = useRef(null);

  const startConnect = () => {
    const c = {
      x: ref.current.getBoundingClientRect().x + 10,
      y: ref.current.getBoundingClientRect().y + 10,
      id: connectorKey
    };
    setConnector(c);
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
      ref={ref}
      className={`node ${
        connector !== null && connector.id === connectorKey ? "connecting" : ""
      }`}
      onMouseDown={startConnect}
      onMouseUp={endConnect}
    />
  );
}
