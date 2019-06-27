import React, { useRef } from "react";
import Shader from "../shader";

interface iSin {
  id: string;
  title?: string;
  x: number;
  y: number;
}

const fs = `precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

#define T u_time
#define R u_resolution

const int maxStep = 128;

float sphSdf(vec3 p, float s) {
  return length(p) - s;
}

float sdf(vec3 p) {
  float sph = sphSdf(p, .3);
  return sph;
}

vec3 norm(vec3 p) {
  vec2 e = vec2(.001, 0.);
  return normalize(vec3(
    sdf(p + e.xyy) - sdf(p - e.xyy),
    sdf(p + e.yxy) - sdf(p - e.yxy),
    sdf(p + e.yyx) - sdf(p - e.yyx)
  ));
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2. - R.xy) / max(R.x, R.y);

  vec3 cp = vec3(0., 0., -1.);
  vec3 cf = vec3(0., 0., 1.);
  vec3 cu = vec3(0., 1., 0.);
  vec3 cl = cross(cu, cf);
  float td = 1.;

  vec3 ray = normalize(uv.x * cl + uv.y * cu + td * cf);

  bool hit = false;
  vec3 hp = vec3(0.);
  vec3 hn = vec3(0.);
  int st = 0;
  float t = 0.;

  for(int i = 0; i < maxStep; i++) {
    vec3 p = cp + t * ray;
    float d = sdf(p);
    if(d < .001) {
      hit = true;
      hp = p;
      hn = norm(p);
      st = i;
      break;
    }
    t += d;
  }

  vec3 c = vec3(0.);
  if(hit) {
    vec3 sao = vec3(float(st) / float(maxStep));
    vec3 lp = vec3(-1., 1., -1.);
    vec3 ld = normalize(lp - hp);
    float dif = max(dot(hn, ld), .0);
    c = (vec3(1.) - sao) * dif;
  }

  gl_FragColor = vec4(c, 1.);
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
