import React, { useRef, useState, useCallback, useContext } from "react";
import { DispatchContext } from "../Contexts/dispatch";

import { uniqueID } from "../uniqueID";

interface iNode {
  id: string;
  direction: string;
  index: number;
}

export function Node({ id, direction, index }: iNode) {
  const { dispatch, state } = useContext(DispatchContext);

  const position = useCallback(node => {
    if (node !== null) {
      const { x, y, width, height } = node.getBoundingClientRect();
      dispatch({
        type: "node/register",
        payload: {
          nodeId: id,
          id,
          direction,
          index,
          x: x + width / 2,
          y: y + height / 2
        }
      });
    }
  }, []);

  const connect = () => {
    dispatch({
      type: "node/connect",
      payload: { nodeId: id }
    });
  };

  return (
    <div key={id} ref={position} onMouseDown={connect} onMouseUp={connect} />
  );
}
