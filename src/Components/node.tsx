import React, { useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DispatchContext } from "../Contexts/dispatch";
import { MouseContext } from "../Contexts/mouse";

import {
  IconDefinition,
  findIconDefinition
} from "@fortawesome/fontawesome-svg-core";

const typeIcons: { [s: string]: IconDefinition } = {
  any: findIconDefinition({ prefix: "fas", iconName: "question" }),
  float: findIconDefinition({ prefix: "fas", iconName: "equals" }),
  string: findIconDefinition({ prefix: "fas", iconName: "quote-right" }),
  vec3: findIconDefinition({ prefix: "fas", iconName: "vector-square" }),
  array: findIconDefinition({ prefix: "fas", iconName: "clone" }),
  event: findIconDefinition({ prefix: "fas", iconName: "calendar" })
};

interface iNode {
  id: string;
  direction: string;
  index: number | null;
  type?: string;
}

export function Node({ id, direction, index, type }: iNode) {
  const { dispatch } = useContext(DispatchContext);
  const [, , posx, posy] = useContext(MouseContext);
  const ref = useRef<HTMLDivElement>(null);

  const connect = (e: React.MouseEvent) => {
    e.stopPropagation();
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
          x: x + width / 2 + (2500 - posx),
          y: y + height / 2 + (2500 - posy),
          direction,
          index,
          type
        }
      });
    }
  };

  return (
    <div key={id} ref={ref} onMouseDown={connect} onMouseUp={connect}>
      <FontAwesomeIcon icon={typeIcons[type || "any"]} size="xs" />
    </div>
  );
}
