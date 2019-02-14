import React, { useState, useEffect } from "react";

export default function useMousePosition() {
  let [MousePosition, setMousePosition] = useState({
    x: null,
    y: null
  });

  function handleMouseMove(e) {
    setMousePosition({
      x: e.pageX,
      y: e.pageY
    });
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return MousePosition;
}
