import React, { useState, useEffect, useRef, useContext } from "react";
import { ConnectorContext } from "../Contexts/connector";
import { DispatchContext } from "../Contexts/dispatch";
import { MouseContext } from "../Contexts/mouse";

interface iPanel {
  id?: string;
  title: string;
  x: number;
  y: number;
  inputs: any;
  outputs: any;
  controls: any;
  nopadding?: boolean;
}

interface iInitPos {
  x: number;
  y: number;
}

export function Panel({
  id,
  title,
  x,
  y,
  inputs,
  outputs,
  controls,
  nopadding
}: iPanel) {
  const [connector, setConnector, connectConnector] = useContext(
    ConnectorContext
  );

  const dispatch = useContext(DispatchContext);

  const [mouseX, mouseY] = useContext(MouseContext);

  const panelRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [initPos, setInitPos] = useState({ x: 0, y: 0 });
  const [delta, setDelta] = useState({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x, y });

  useEffect(() => {
    if (panelRef.current !== null) {
      dispatch({
        type: "panelRegister",
        id,
        value: {
          pos,
          panelRef
        }
      });
    }
  }, [panelRef]);

  // useEffect(() => {

  // }, [state])

  useEffect(() => {
    if (dragging) {
      const deltaX = mouseX - initPos.x;
      const deltaY = mouseY - initPos.y;
      setDelta({ x: deltaX, y: deltaY });
    }
  }, [dragging, mouseX, mouseY]);

  return (
    <article
      ref={panelRef}
      className="Panel"
      style={{ top: pos.y + delta.y, left: pos.x + delta.x }}
    >
      <header
        className="Title"
        onMouseDown={(e: React.MouseEvent) => {
          setDragging(true);
          setInitPos({ x: e.clientX, y: e.clientY });
          console.log("down", initPos, pos);
        }}
        onMouseUp={e => {
          dispatch({
            type: "panelMove",
            id: id,
            value: { x: delta.x, y: delta.y }
          });
          setDragging(false);
          setPos({ x: pos.x + delta.x, y: pos.y + delta.y });
          setDelta({ x: 0, y: 0 });
        }}
      >
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
