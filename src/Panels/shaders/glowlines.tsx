import React, { useRef } from "react";
import { Input } from "../../Components/input";
import Shader from "../outputs/shader";

interface iShader {
  id: string;
  title?: string;
  x: number;
  y: number;
}

const fs = `
#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

void main( void )
{
	vec2 p = ( gl_FragCoord.xy / u_resolution.xy ) * 2.0 - 1.0;

	vec3 c = vec3( 0.0 );

	float amplitude = 0.50;
	float glowT = 0.5;
	float glowFactor = mix( 0.15, 0.35, glowT );

	c += vec3(0.02, 0.03, 0.13) * ( glowFactor * abs( 1.0 / sin(p.x + sin( p.y + u_time ) * amplitude ) ));
	c += vec3(0.02, 0.10, 0.03) * ( glowFactor * abs( 1.0 / sin(p.x + cos( p.y + u_time+1.00 ) * amplitude+0.1 ) ));
	c += vec3(0.15, 0.05, 0.20) * ( glowFactor * abs( 1.0 / sin(p.y + sin( p.x + u_time+1.30 ) * amplitude+0.15 ) ));
	c += vec3(0.20, 0.05, 0.05) * ( glowFactor * abs( 1.0 / sin(p.y + cos( p.x + u_time+3.00 ) * amplitude+0.3 ) ));
	c += vec3(0.17, 0.17, 0.05) * ( glowFactor * abs( 1.0 / sin(p.y + cos( p.x + u_time+5.00 ) * amplitude+0.2 ) ));

	gl_FragColor = vec4( c, 1.0 );

}
`;

const vs = `attribute vec4 position;
void main() {
  gl_Position = position;
}
`;

export default function Shader_Tunnel({ id, title, x, y }: iShader) {
  const input = useRef([vs, fs, 0, [1, 0, 0]]);

  const inputs = [
    <Input
      key={`input-${id}-2`}
      id={id}
      direction={"in"}
      index={2}
      value={input.current[2]}
      title={"u_time"}
      type={"float"}
    />,
    <Input
      key={`input-${id}-3`}
      id={id}
      direction={"in"}
      index={3}
      value={input.current[3]}
      title={"u_color"}
      type={"array"}
    />
  ];

  return (
    <Shader
      key={id}
      id={id}
      x={x}
      y={y}
      title={"Glowlines Shader"}
      inputs={inputs}
      defaults={input}
    />
  );
}
