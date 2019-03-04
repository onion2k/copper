import React, { useState, useEffect, useRef } from "react";

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
  const panelRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [initPos, setInitPos] = useState({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x, y });
  return (
    <div ref={panelRef} className="Panel" style={{ top: pos.y, left: pos.x }}>
      <div
        className="Title"
        onMouseDown={(e: React.MouseEvent<EventTarget>) => {
          setDragging(true);
          setInitPos({ x: e.clientX, y: e.clientY });
        }}
        onMouseUp={() => setDragging(false)}
        onMouseMove={(e: React.MouseEvent<EventTarget>) => {
          if (dragging) {
            const deltaX = e.clientX - initPos.x;
            const deltaY = e.clientY - initPos.y;

            setPos({ x: x + deltaX, y: y + deltaY });
          }
        }}
      >
        {title}
      </div>
      <div className="IO">{io}</div>
      <p className="Description">{controls}</p>
    </div>
  );
}
