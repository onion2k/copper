import React, { useRef, useState, useEffect, useContext } from "react";
import { ConnectorContext } from "../Contexts/connector";
import { DispatchContext } from "../Contexts/dispatch";
import { MouseContext } from "../Contexts/mouse";

interface iConnector {
  id: string;
  direction: string;
  index: number;
}

export function Connector({ id, direction, index }: iConnector) {
  const [connector, setConnector, connectConnector] = useContext(
    ConnectorContext
  );

  const dispatch = useContext(DispatchContext);

  const [mouseX, mouseY] = useContext(MouseContext);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current !== null) {
      const {
        x,
        y,
        width,
        height
      } = ref.current.getBoundingClientRect() as DOMRect;
      dispatch({
        type: "registerNode",
        node: {
          id,
          direction,
          index,
          x: x + width / 2,
          y: y + height / 2
        }
      });
    }
  }, [ref]);

  const startConnect = () => {
    if (ref.current !== null) {
      const {
        x,
        y,
        width,
        height
      } = ref.current.getBoundingClientRect() as DOMRect;
      const c = {
        x: x + width / 2,
        y: y + height / 2,
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
