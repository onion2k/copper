import React, { useRef, useState, useEffect, useContext } from "react";
import { ConnectorContext } from "../Contexts/connector";

interface iConnector {
  id: string;
  direction: string;
  index: number;
}

export function Connector({ id, direction, index }: iConnector) {
  const [connector, setConnector, connectConnector, registerNode] = useContext(
    ConnectorContext
  );

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current !== null) {
      const { x, y } = ref.current.getBoundingClientRect() as DOMRect;
      registerNode({
        id: id,
        direction: direction,
        index: index,
        x,
        y
      });
    }
  }, [ref]);

  const startConnect = () => {
    if (ref.current !== null) {
      const { x, y } = ref.current.getBoundingClientRect() as DOMRect;
      const c = {
        x: x + 10,
        y: y + 10,
        id: id,
        direction: direction,
        index: index,
        key: `${id}-${direction}-${index}`
      };
      setConnector(c);
    }
  };

  const endConnect = (e: any) => {
    e.preventDefault();
    if (connector) {
      const c = {
        id: id,
        direction: direction,
        index: index,
        key: `${id}-${direction}-${index}`
      };
      connectConnector(c);
      setConnector(null);
    }
  };

  return (
    <div
      key={`${id}-${direction}-${index}`}
      ref={ref}
      className={`node ${
        connector !== null && connector.key === `${id}-${direction}-${index}`
          ? "connecting"
          : ""
      }`}
      onMouseDown={startConnect}
      onMouseUp={endConnect}
    />
  );
}
