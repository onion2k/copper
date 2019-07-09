import React, { useRef } from "react";
import Shader from "../outputs/shader";

interface iSin {
  id: string;
  title?: string;
  x: number;
  y: number;
}

const fs = ``;

const vs = `attribute vec4 position;
void main() {
  gl_Position = position;
}
`;

export default function Shader_Color({ id, title, x, y }: iSin) {
  const input = useRef([vs, fs, 0]);

  return (
    <Shader
      key={id}
      id={id}
      x={x}
      y={y}
      title={"Color Shader"}
      defaults={input}
    />
  );
}
