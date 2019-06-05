import React, { useState, useEffect, useRef, useContext } from "react";
import { ConnectorContext } from "../Contexts/connector";

interface iPanel {
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

export function Panel({ title, x, y, io, controls }: iPanel) {
  const [
    connector,
    setConnector,
    connectConnector,
    registerNode,
    mouseX,
    mouseY
  ] = useContext(ConnectorContext);

  const panelRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [initPos, setInitPos] = useState({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x, y });

  useEffect(() => {
    if (dragging) {
      const deltaX = mouseX - initPos.x;
      const deltaY = mouseY - initPos.y;
      setPos({ x: x + deltaX, y: y + deltaY });
    }
  });

  return (
    <div ref={panelRef} className="Panel" style={{ top: pos.y, left: pos.x }}>
      <div
        className="Title"
        onMouseDown={(e: React.MouseEvent) => {
          setDragging(true);
          setInitPos({ x: e.clientX, y: e.clientY });
        }}
        onMouseUp={() => setDragging(false)}
      >
        {title}
      </div>
      <div className="IO">{io}</div>
      <p className="Description">{controls}</p>
    </div>
  );
}
