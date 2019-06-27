import React, { useRef } from "react";
import { Input } from "../../Components/input";
import Shader from "../shader";

interface iSin {
  id: string;
  title?: string;
  x: number;
  y: number;
}

const fs = `precision mediump float;
uniform float u_time; // time
uniform vec3  u_color; // color
uniform vec2  u_resolution; // resolution

void main(void){
    vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);
    float l = 0.05 / abs(length(p) - 0.5);
    l += 0.05 / abs(length(p*sin(u_time)) - 0.3);
    l += 0.05 / abs(length(p) - 0.1);
    gl_FragColor = vec4(l * u_color, 1.0);
}`;

const vs = `attribute vec4 position;
void main() {
  gl_Position = position;
}
`;

export default function Shader_SDF({ id, title, x, y }: iSin) {
  const input = useRef([vs, fs, 0, [1, 0, 0]]);

  const inputs = [
    // <Input
    //   key={`input-${id}-0`}
    //   id={id}
    //   direction={"in"}
    //   index={0}
    //   value={input.current[0]}
    //   title={"vs"}
    // />,
    // <Input
    //   key={`input-${id}-1`}
    //   id={id}
    //   direction={"in"}
    //   index={1}
    //   value={input.current[1]}
    //   title={"fs"}
    // />,
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
      title={"Rings Shader"}
      inputs={inputs}
      defaults={input}
    />
  );
}
