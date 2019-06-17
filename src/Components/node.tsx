import React, { useRef, useState, useEffect, useContext } from "react";
import { DispatchContext } from "../Contexts/dispatch";

import { uniqueID } from "../uniqueID";

interface iNode {
  id: string;
  direction: string;
  index: number;
}

export function Node({ id, direction, index }: iNode) {
  const { dispatch, state } = useContext(DispatchContext);

  const nodeId = useRef(uniqueID());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const {
      x,
      y,
      width,
      height
    } = ref.current.getBoundingClientRect() as DOMRect;
    dispatch({
      type: "node/register",
      payload: {
        nodeId: nodeId.current,
        id,
        direction,
        index,
        x: x + width / 2,
        y: y + height / 2
      }
    });
  }, [ref]);

  const connect = () => {
    if (ref.current !== null) {
      dispatch({
        type: "node/connect",
        payload: { nodeId: nodeId.current }
      });
    }
  };

  return (
    <div
      key={nodeId.current}
      ref={ref}
      onMouseDown={connect}
      onMouseUp={connect}
    />
  );
}
