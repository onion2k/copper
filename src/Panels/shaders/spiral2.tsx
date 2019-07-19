import React, { useRef } from "react";
import iPanel from "../../Interfaces/panel";

import { Input } from "../../Components/input";
import Shader from "../outputs/shader";

const fs = `
#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

#define pi 3.141592653589

vec3 drawSpiral(vec2 uv, vec3 col, float thickness){

    //float lim = 12.*pi;
    float growth = sqrt(2.);
    float theta = ( pi*log(length(uv)) )/(2.*log(growth) ); //angle of spiral for length of UV vector with spiral being r(theta)
    vec2 spiral = pow(growth,2./pi * theta)*vec2(cos(theta),sin(theta));

    if( abs(dot(normalize(uv),normalize(spiral))-1.) < 1.195 && abs(length(uv)-length(spiral)) < thickness  ){
     col = vec3(1.)*(1.0 - abs(dot(normalize(uv),normalize(spiral))-1.));
    }

    col*=vec3((sin(u_time)+1.)/3.+.5,(cos(u_time)+1.)/3.+.5,(cos(u_time)+1.)/3.+.5);

    return col;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
  // Normalized pixel coordinates (from 0 to 1)
  vec2 uv = 2.*(fragCoord-u_resolution.xy*.5)/u_resolution.y;
	uv /= u_time; //fract(u_time)/.5+.675;

  // Time varying pixel color
  vec3 col = vec3(0.);

  //col = shape(uv, col, vec2(0.45, 0.25), 1., vec3(1.),  .0125);
  col = drawSpiral(uv, col, .45);
  // Output to screen
  fragColor = vec4(col / (col + 0.25),1.0);
}
// --------[ Original ShaderToy ends here ]---------- //

void main(void)
{
    mainImage(gl_FragColor, gl_FragCoord.xy);
}`;

const vs = `attribute vec4 position;
void main() {
  gl_Position = position;
}
`;

export default function Shader_Spiral2({ id, title, x, y }: iPanel) {
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
      uniforms={["u_time", "u_color"]}
      defaults={input}
      uniforms={["u_time"]}
      inputs={inputs}
    />
  );
}
