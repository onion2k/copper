import React, { useRef } from "react";
import Shader from "../shader";

interface iSin {
  id: string;
  title?: string;
  x: number;
  y: number;
}

const fs = `precision mediump float;
uniform float u_time; // time
uniform vec2  u_resolution; // resolution

void main(void){
	vec3 destColor = vec3(0.0, 0.3, 0.7);
    vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);
    float l = 0.05 / abs(length(p) - 0.5);
    l += 0.05 / abs(length(p*sin(u_time)) - 0.3);
    l += 0.05 / abs(length(p) - 0.1);
    gl_FragColor = vec4(l*destColor, 3);
}`;

const vs = `attribute vec4 position;
void main() {
  gl_Position = position;
}
`;

export default function Shader_SDF({ id, title, x, y }: iSin) {
  const input = useRef([vs, fs, 0]);

  return (
    <Shader
      key={id}
      id={id}
      x={x}
      y={y}
      title={"SDF Shader"}
      defaults={input}
    />
  );
}
