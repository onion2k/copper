import React, { useState, useEffect } from "react";

interface iPanel {
  ref?: any;
  title: string;
  x: number;
  y: number;
  io: any;
  controls: any;
}

export function Panel({
  ref = React.createRef(),
  title,
  x,
  y,
  io,
  controls
}: iPanel) {
  useEffect(() => {
    if (ref.current) {
      // console.log(ref.current.getBoundingClientRect());
    }
  });
  return (
    <div className="Panel" style={{ top: y, left: x }} ref={ref}>
      <div className="Title">{title}</div>
      <div className="IO">{io}</div>
      <p className="Description">{controls}</p>
    </div>
  );
}
