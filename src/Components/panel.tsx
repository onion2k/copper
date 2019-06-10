import React, { useState, useEffect, useRef, useContext } from "react";
import { ConnectorContext } from "../Contexts/connector";
import { MouseContext } from "../Contexts/mouse";

interface iPanel {
  id?: string;
  title: string;
  x: number;
  y: number;
  io: any;
  controls: any;
}

interface iInitPos {
  x: number;
  y: number;
}

export function Panel({ id, title, x, y, io, controls }: iPanel) {
  const [
    connector,
    setConnector,
    connectConnector,
    registerNode,
    dispatch
  ] = useContext(ConnectorContext);

  const [mouseX, mouseY] = useContext(MouseContext);

  const panelRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [initPos, setInitPos] = useState({ x: 0, y: 0 });
  const [delta, setDelta] = useState({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x, y });

  useEffect(() => {
    dispatch({
      type: "panelRegister",
      id,
      value: {
        pos,
        panelRef
      }
    });
  }, []);

  useEffect(() => {
    if (dragging) {
      const deltaX = mouseX - initPos.x;
      const deltaY = mouseY - initPos.y;
      setDelta({ x: deltaX, y: deltaY });
    }
  }, [dragging, mouseX, mouseY]);

  return (
    <div
      ref={panelRef}
      className="Panel"
      style={{ top: pos.y + delta.y, left: pos.x + delta.x }}
    >
      <div
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
            value: delta
          });
          setDragging(false);
          setPos({ x: pos.x + delta.x, y: pos.y + delta.y });
          setDelta({ x: 0, y: 0 });
        }}
      >
        {title}
      </div>
      <div className="IO">{io}</div>
      <p className="Description">{controls}</p>
    </div>
  );
}
