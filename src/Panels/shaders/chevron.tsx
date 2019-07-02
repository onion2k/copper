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
uniform vec3 u_color;
uniform vec2 u_resolution;

void main( void ) {
	vec2 uv = ( gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
	float d = step(sin((uv.y - u_time * 0.1 + abs(uv.x) * 0.5) * 8.0), 0.0);
  gl_FragColor = vec4( d * u_color, 1.0 );
}`;

const vs = `attribute vec4 position;
void main() {
  gl_Position = position;
}
`;

export default function Shader_Chevron({ id, title, x, y }: iSin) {
  const input = useRef([vs, fs, 0, [1, 0, 0]]);

  const inputs = [
    <Input
      key={`input-${id}-2`}
      id={id}
      direction={"in"}
      index={2}
      value={input.current[2]}
      title={"u_time"}
    />,
    <Input
      key={`input-${id}-3`}
      id={id}
      direction={"in"}
      index={3}
      value={input.current[3]}
      title={"u_color"}
    />
  ];

  return (
    <Shader
      key={id}
      id={id}
      x={x}
      y={y}
      title={"Chevron Shader"}
      inputs={inputs}
      defaults={input}
    />
  );
}
