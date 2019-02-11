import React, { useState, useEffect } from "react";

interface iPanel {
  title: string;
  x: number;
  y: number;
  io: any;
  controls: any;
}

export function Panel({ title, x, y, io, controls }: iPanel) {
  return (
    <div className="Panel" style={{ top: y, left: x }}>
      <div className="Title">{title}</div>
      <div className="IO">{io}</div>
      <p className="Description">{controls}</p>
    </div>
  );
}
