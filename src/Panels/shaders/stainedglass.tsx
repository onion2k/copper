import React, { useRef } from "react";
import iPanel from "../../Interfaces/panel";

import { Input } from "../../Components/input";
import Shader from "../outputs/shader";

const fs = `#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

void main()
{
	vec2 position = gl_FragCoord.xy / u_resolution.xy - 0.5;

	float r = length(position);
	float a = atan(position.y, position.x);
	float t = u_time + 100.0/(r+1.0);

	float light = 15.0*abs(0.05*(sin(t)+sin(u_time+a*8.0)));
	vec3 color = vec3(-sin(r*5.0-a-u_time+sin(r+t)), sin(r*3.0+a-cos(u_time)+sin(r+t)), cos(r+a*2.0+log(5.001-(a/4.0))+u_time)-sin(r+t));

	gl_FragColor = vec4((normalize(color)+0.9) * light , 1.0);
}
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
      title={"Stained Glass Shader"}
      uniforms={["u_time", "u_color"]}
      inputs={inputs}
      defaults={input}
    />
  );
}
