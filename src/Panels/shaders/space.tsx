import React, { useRef } from "react";
import { Input } from "../../Components/input";
import Shader from "../shader";

interface iShader {
  id: string;
  title?: string;
  x: number;
  y: number;
}

const fs = `#ifdef GL_ES
precision mediump float;
#endif

uniform vec2      u_resolution; // viewport resolution (in pixels)
uniform float     u_time;       // shader playback time (in seconds)
uniform vec4      u_mouse;      // mouse pixel coords. xy: current (if MLB down), zw: click

#define iterations 17
#define formuparam 0.5

#define volsteps 15
#define stepsize 0.1

#define zoom   0.900
#define tile   0.350
#define speed  0.004

#define brightness 0.0020
#define darkmatter 0.500
#define distfading 0.730
#define saturation 0.95


void main()
{
	//get coords and direction
	vec2 uv=gl_FragCoord.xy/u_resolution.xy-.26;
	uv.y*=u_resolution.y/u_resolution.x;
	vec3 dir=vec3(uv*zoom,1.);
	float time=u_time*speed+.25;

	//mouse rotation
	float a1=u_mouse.y;
	float a2=u_mouse.x;
	mat2 rot1=mat2(cos(a1),sin(a1),-sin(a1),cos(a1));
	mat2 rot2=mat2(cos(a2),sin(a2),-sin(a2),cos(a2));
	dir.xz*=rot1;
	dir.xy*=rot2;
	vec3 from=vec3(1.,.5,0.5);
	from+=vec3(0.,-time,-2.);
	from.xz*=rot1;
	from.xy*=rot2;

	//volumetric rendering
	float s=0.1,fade=1.;
	vec3 v=vec3(0.);
	for (int r=0; r<volsteps; r++) {
		vec3 p=from+s*dir*.5;
		p = abs(vec3(tile)-mod(p,vec3(tile*2.))); // tiling fold
		float pa,a=pa=0.;
		for (int i=0; i<iterations; i++) {
			p=abs(p)/dot(p,p)-formuparam; // the magic formula
			a+=abs(length(p)-pa); // absolute sum of average change
			pa=length(p);
		}
		float dm=max(0.,darkmatter-a*a*.001); //dark matter
		a*=a*a; // add contrast
		if (r>6) fade*=1.-dm; // dark matter, don't render near
		//v+=vec3(dm,dm*.5,0.);
		v+=fade;
		v+=vec3(s,s*s,s*s*s*s)*a*brightness*fade; // coloring based on distance
		fade*=distfading; // distance fading
		s+=stepsize;
	}
	v=mix(vec3(length(v)),v,saturation); //color adjust
	gl_FragColor = vec4(v*.01,1.);
}`;

const vs = `attribute vec4 position;
void main() {
  gl_Position = position;
}
`;

export default function Shader_Rings({ id, title, x, y }: iShader) {
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
      title={"Rings Shader"}
      inputs={inputs}
      defaults={input}
    />
  );
}
