import React, { useRef } from "react";
import iPanel from "../../Interfaces/panel";

import { Input } from "../../Components/input";
import Shader from "../outputs/shader";

const fs = `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;

#define PI 3.14159265358979323846264338327950288419716939937
#define TAU 6.28318530717958647692528676655900576839433879875

float nsin(float x){return(sin(x*TAU)+1.)/2.;}
float ncos(float x){return(cos(x*TAU)+1.)/2.;}

#ifndef saturate
  #define saturate(v) clamp(v,0.,1.)
#endif

vec3 hue2rgb(float hue){
	hue=fract(hue);
	return saturate(vec3(
		abs(hue*6.-3.)-1.,
		2.-abs(hue*6.-2.),
		2.-abs(hue*6.-4.)
	));
}
void main(void){
	vec2 pixel=floor(gl_FragCoord.xy);
	vec2 uv=gl_FragCoord.xy/u_resolution;
	vec2 p=vec2((uv.x-.5)/(u_resolution.y/u_resolution.x),uv.y-.5);
	float c=(atan(p.y,p.x)+PI)/TAU;
	c=fract((length(p)*sin(u_time)*2.)+c-u_time);
	gl_FragColor=vec4(hue2rgb(c),1.);
}`;

const vs = `attribute vec4 position;
void main() {
  gl_Position = position;
}
`;

export default function Shader_Spiral({ id, title, x, y }: iPanel) {
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
    />
  ];

  return (
    <Shader
      key={id}
      id={id}
      x={x}
      y={y}
      title={"Spiral Shader"}
      defaults={input}
      inputs={inputs}
    />
  );
}
