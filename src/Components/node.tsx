import React, { useRef, useContext } from "react";
import { DispatchContext } from "../Contexts/dispatch";

interface iNode {
  id: string;
  direction: string;
  index: number;
}

export function Node({ id, direction, index }: iNode) {
  const { dispatch } = useContext(DispatchContext);

  const ref = useRef<HTMLDivElement>(null);

  const connect = () => {
    if (ref.current !== null) {
      const {
        x,
        y,
        width,
        height
      } = ref.current.getBoundingClientRect() as DOMRect;
      dispatch({
        type: "node/connect",
        payload: { nodeId: id, x, y, width, height }
      });
    }
  };

  return <div key={id} ref={ref} onMouseDown={connect} onMouseUp={connect} />;
}
