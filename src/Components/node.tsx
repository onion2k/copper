import React, { useState, useRef, useEffect, useContext } from "react";
import { DispatchContext } from "../Contexts/dispatch";

interface iNode {
  id: string;
  direction: string;
  index: number | null;
}

export function Node({ id, direction, index }: iNode) {
  const { dispatch } = useContext(DispatchContext);
  const ref = useRef<HTMLDivElement>(null);

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
        payload: {
          id,
          x: x + width / 2,
          y: y + height / 2,
          direction,
          index
        }
      });
    }
  };

  return <div key={id} ref={ref} onMouseDown={connect} onMouseUp={connect} />;
}
