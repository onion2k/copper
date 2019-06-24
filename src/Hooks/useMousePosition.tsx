import { useState, useEffect } from "react";

export default function useMousePosition() {
  let [MousePosition, setMousePosition] = useState({
    x: -1,
    y: -1
  });

  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({
      x: e.pageX,
      y: e.pageY
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", e => handleMouseMove(e));

    return () => {
      window.removeEventListener("mousemove", e => handleMouseMove(e));
    };
  }, []);

  return MousePosition;
}
