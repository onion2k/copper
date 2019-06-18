import React, { useState, useRef, useEffect, useContext } from "react";
import { DispatchContext } from "../Contexts/dispatch";

interface iNode {
  id: string;
  direction: string;
  index: number;
}

export function Node({ id, direction, index }: iNode) {
  const { dispatch } = useContext(DispatchContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref && ref.current) {
      const {
        x,
        y,
        width,
        height
      } = ref.current.getBoundingClientRect() as DOMRect;
      dispatch({
        type: "node/register",
        payload: { nodeId: id, x: x + width / 2, y: y + height / 2 }
      });
    }
  }, [ref]);

  const connect = () => {
    if (ref && ref.current !== null) {
      const {
        x,
        y,
        width,
        height
      } = ref.current.getBoundingClientRect() as DOMRect;
      dispatch({
        type: "node/connect",
        payload: { nodeId: id, x: x + width / 2, y: y + height / 2 }
      });
    }
  };

  return <div key={id} ref={ref} onMouseDown={connect} onMouseUp={connect} />;
}
