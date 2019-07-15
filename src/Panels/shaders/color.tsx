import React, { useRef } from "react";
import { Input } from "../../Components/input";
import Shader from "../outputs/shader";

interface iSin {
  id: string;
  title?: string;
  x: number;
  y: number;
}

const fs = `#ifdef GL_ES
  precision mediump float;
#endif
uniform float u_time;
uniform vec2 u_resolution;
void main()
{
  // Normalized pixel coordinates (from 0 to 1)
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  // Time varying pixel color
  vec3 col = 0.5 + 0.5*cos(u_time + uv.xyx + vec3(0,2,4));
  // Output to screen
  gl_FragColor = vec4(col,1.0);
}`;

const vs = `attribute vec4 position;
void main() {
  gl_Position = position;
}
`;

export default function Shader_Color({ id, title, x, y }: iSin) {
  const input = useRef([vs, fs, 0]);

  const inputs = [
    <Input
      key={`input-${id}-2`}
      id={id}
      direction={"in"}
      index={2}
      value={input.current[2]}
      title={"u_time"}
      type="float"
    />,
    <Input
      key={`input-${id}-3`}
      id={id}
      direction={"in"}
      index={3}
      value={input.current[3]}
      title={"u_color"}
      type="array"
    />
  ];

  return (
    <Shader
      key={id}
      id={id}
      x={x}
      y={y}
      title={"Color Shader"}
      defaults={input}
      inputs={inputs}
    />
  );
}
