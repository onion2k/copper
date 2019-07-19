import React, { useRef } from "react";
import iPanel from "../../Interfaces/panel";

import { Input } from "../../Components/input";
import Shader from "../outputs/shader";

const fs = `#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

#define IRAD 0.5
#define ORAD 2.0

vec3 hsv(float h,float s,float v){return ((clamp(abs(fract(h+vec3(0.,.666,.333))*6.-3.)-1.,0.,1.)-1.)*s+1.)*v;}
vec2 cdiv(vec2 a,vec2 b){return vec2(a.x*b.x-a.y*-b.y,a.x*-b.y+a.y*b.x)/dot(b,b);}
vec2 clog (vec2 z){return vec2(log(length(z)),atan(z.y,z.x));}
vec2 cexp (vec2 z){return vec2(cos(z.y),sin(z.y))*exp(z.x);}
vec2 tr(vec2 z){float s=log(ORAD/IRAD),a=atan(s/6.283);z=cdiv(clog(z),cexp(vec2(0,a))*cos(a));z.x=mod(z.x,s);return cexp(z)*IRAD;}
vec3 tx(vec2 p){
	float c=cos(u_time),s=sin(u_time);p*=mat2(c,s,-s,c);
	float v=abs(p.x)+abs(p.y);v*=step(v,2.)*step(.72-v,0.);
	return hsv(fract(floor(v*16.)*.125),.4,fract(v*1.73));
}
void main(void){gl_FragColor=vec4(tx(tr((gl_FragCoord.xy*2.-u_resolution.xy)/min(u_resolution.x,u_resolution.y))),1);}
`;

const vs = `attribute vec4 position;
void main() {
  gl_Position = position;
}
`;

export default function Shader_Tunnel({ id, title, x, y }: iPanel) {
  const input = useRef([vs, fs, 0, [1, 0, 0]]);

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
      title={"Tunnel Shader"}
      uniforms={["u_time", "u_color"]}
      inputs={inputs}
      uniforms={["u_time", "u_color"]}
      defaults={input}
    />
  );
}
