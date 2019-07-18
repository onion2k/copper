import React, { useRef } from "react";
import iPanel from "../../Interfaces/panel";

import { Input } from "../../Components/input";
import Shader from "../outputs/shader";

const fs = `#ifdef GL_ES
  precision highp float;
#endif
uniform float u_time;
uniform vec2 u_resolution;

const float Pi = 3.14159;
const int zoom = 40;
const float speed = 1.0;
float fScale = 1.25;

void main(void)
{

	vec2 uv = gl_FragCoord.xy / u_resolution.xy;
	vec2 p=(2.0*gl_FragCoord.xy-u_resolution.xy)/max(u_resolution.x,u_resolution.y);

	float ct = u_time * speed;

	for(int i=1;i<zoom;i++) {
		vec2 newp=p;
		newp.x+=0.25/float(i)*cos(float(i)*p.y+u_time*cos(ct)*0.3/40.0+0.03*float(i))*fScale+10.0;
		newp.y+=0.5/float(i)*cos(float(i)*p.x+u_time*ct*0.3/50.0+0.03*float(i+10))*fScale+15.0;
		p=newp;
	}

	vec3 col=vec3(0.5*sin(3.0*p.x)+0.5,0.5*sin(3.0*p.y)+0.5,sin(p.x+p.y));
	gl_FragColor=vec4(col, 1.0);
}`;

const vs = `attribute vec4 position;
void main() {
  gl_Position = position;
}
`;

export default function Shader_Swirl({ id, title, x, y }: iPanel) {
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
      title={"Swirl Shader"}
      defaults={input}
      uniforms={["u_time", "u_color"]}
      inputs={inputs}
    />
  );
}
