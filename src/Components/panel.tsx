import React, { useState, useEffect, useRef } from "react";

interface iPanel {
  title: string;
  x: number;
  y: number;
  io: any;
  controls: any;
}

export function Panel({ title, x, y, io, controls }: iPanel) {
  const panelRef = useRef(null);
  return (
    <div ref={panelRef} className="Panel" style={{ top: y, left: x }}>
      <div className="Title">{title}</div>
      <div className="IO">{io}</div>
      <p className="Description">{controls}</p>
    </div>
  );
}
