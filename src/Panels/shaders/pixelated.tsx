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

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

const int   complexity      = 20;    // More points of color.
const float mouse_factor    = 25.0;  // Makes it more/less jumpy.
const float mouse_offset    = 5.0;   // Drives complexity in the amount of curls/cuves.  Zero is a single whirlpool.
const float fluid_speed     = 45.0;  // Drives speed, higher number will make it slower.
const float color_intensity = 0.7;

const float Pi = 3.14159;

float sinApprox(float x) {
    x = Pi + (2.0 * Pi) * floor(x / (2.0 * Pi)) - x;
    return (4.0 / Pi) * x - (4.0 / Pi / Pi) * x * abs(x);
}

float cosApprox(float x) {
    return sinApprox(x + 0.5 * Pi);
}

void main()
{
  vec2 p=(2.0*gl_FragCoord.xy-u_resolution)/max(u_resolution.x,u_resolution.y);
	float a=((mod(gl_FragCoord.x,2.)+mod(gl_FragCoord.y,2.))-((mod(gl_FragCoord.x,4.)+mod(gl_FragCoord.y,4.))/8.))/8.;
  for(int i=1;i<complexity;i++)
  {
    vec2 newp=p;
    newp.x+=0.6/float(i)*sin(float(i)*p.y+u_time/fluid_speed+0.3*float(i))+a/mouse_factor+mouse_offset;
    newp.y+=0.6/float(i)*sin(float(i)*p.x+u_time/fluid_speed+0.3*float(i+10))-u_mouse.x/mouse_factor+mouse_offset;
    p=newp;
  }
  vec3 col=vec3(color_intensity*sin(3.0*p.x)+color_intensity,color_intensity*sin(3.0*p.y)+color_intensity,sin(p.x+p.y));
  gl_FragColor=vec4(col, 1.0);
}
`;

const vs = `attribute vec4 position;
void main() {
  gl_Position = position;
}
`;

export default function Shader_Color({ id, title, x, y }: iSin) {
  const input = useRef([vs, fs, 0, [0, 0]]);

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
      title={"u_mouse"}
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
      uniforms={["u_time", "u_mouse"]}
      inputs={inputs}
    />
  );
}
