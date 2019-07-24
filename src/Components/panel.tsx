import React, { useState, useEffect, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DispatchContext } from "../Contexts/dispatch";
import { MouseContext } from "../Contexts/mouse";

import { findIconDefinition } from "@fortawesome/fontawesome-svg-core";

const closeIcon = findIconDefinition({ prefix: "fas", iconName: "times" });

interface iPanel {
  id?: string;
  title: string;
  x: number;
  y: number;
  inputs: any;
  outputs: any;
  controls: any;
  nopadding?: boolean;
  medium?: boolean;
  large?: boolean;
}

export function Panel({
  id,
  title,
  x,
  y,
  inputs,
  outputs,
  controls,
  nopadding,
  medium,
  large
}: iPanel) {
  const { dispatch } = useContext(DispatchContext);

  const [mouseX, mouseY] = useContext(MouseContext);

  const panelRef = useRef(null);

  const [dragging, setDragging] = useState(false);
  const [initPos, setInitPos] = useState({ x: 0, y: 0 });
  const [delta, setDelta] = useState({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x, y });

  useEffect(() => {
    if (dragging) {
      const deltaX = mouseX - initPos.x;
      const deltaY = mouseY - initPos.y;
      setDelta({ x: deltaX, y: deltaY });
    }
  }, [dragging, mouseX, mouseY, initPos.x, initPos.y]);

  const close = () => {
    dispatch({
      type: "panel/unregister",
      id: id
    });
  };

  return (
    <article
      key={`panel-${id}`}
      ref={panelRef}
      className={`Panel ${large ? "large" : medium ? "medium" : ""}`}
      style={{ top: pos.y + delta.y, left: pos.x + delta.x }}
      onMouseDown={(e: React.MouseEvent) => {
        e.stopPropagation();
      }}
      onMouseUp={(e: React.MouseEvent) => {
        e.stopPropagation();
      }}
    >
      <header
        className="Title"
        onMouseDown={(e: React.MouseEvent) => {
          e.stopPropagation();
          setDragging(true);
          setInitPos({ x: e.clientX, y: e.clientY });
        }}
        onMouseUp={e => {
          dispatch({
            type: "panel/move",
            id: id,
            value: { x: delta.x, y: delta.y }
          });
          setDragging(false);
          setPos({ x: pos.x + delta.x, y: pos.y + delta.y });
          setDelta({ x: 0, y: 0 });
        }}
      >
        <div className="indicator close" onClick={close}>
          <FontAwesomeIcon icon={closeIcon} size="xs" />
        </div>
        <span>{title}</span>
        <div className="indicators">
          <div className="indicator yellow" />
          <div className="indicator green" />
        </div>
      </header>
      <div className="io">
        <ul className="inputs">{inputs}</ul>
        <ul className="outputs">{outputs}</ul>
      </div>
      <div className="controls">
        <div className={`knobs ${nopadding ? "nopadding" : ""}`}>
          {controls}
        </div>
      </div>
    </article>
  );
}
