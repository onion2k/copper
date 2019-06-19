import React, { useEffect, useState, useRef, useContext } from "react";
import * as twgl from "twgl.js";
import useAnimationFrame from "../Hooks/useAnimationFrame";
import { DispatchContext } from "../Contexts/dispatch";
import { Panel } from "../Components/panel";
import { Input } from "../Components/input";
import { Output } from "../Components/output";

const fs = `#ifdef GL_ES
  precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

void main()
{
  // Normalized pixel coordinates (from 0 to 1)
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  // Time varying pixel color
  vec3 col = 0.5 + 0.5*cos(u_time + uv.xyx + vec3(0,2,4));

  // Output to screen
  gl_FragColor = vec4(col,1.0);
}`;

const vs = `attribute vec4 position;
void main() {
  gl_Position = position;
}
`;

interface iShader {
  id: string;
  x: number;
  y: number;
}

export default function Arithmatic({ id, x, y }: iShader) {
  const { dispatch } = useContext(DispatchContext);

  const [gl, setGL] = useState<WebGLRenderingContext | null>(null);
  const [programInfo, setProgramInfo] = useState<twgl.ProgramInfo | null>(null);
  const [arrays, setArrays] = useState({
    position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0]
  });
  const [bufferInfo, setBufferInfo] = useState<twgl.BufferInfo | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasX = 300;
  const canvasY = 200;

  const input = useRef([0, 1]);

  useEffect(() => {
    dispatch({
      type: "panel/register",
      id: id,
      value: input.current
    });

    if (canvasRef.current !== null) {
      const gl = canvasRef.current.getContext("webgl");
      if (gl !== null) {
        setGL(gl);
        setProgramInfo(twgl.createProgramInfo(gl, [vs, fs]));
        setBufferInfo(twgl.createBufferInfoFromArrays(gl, arrays));
      }
    }
  }, [canvasRef]);

  const inputs = [
    <Input id={id} direction={"in"} index={0} value={input.current[0]} />,
    <Input id={id} direction={"in"} index={1} value={input.current[1]} />
  ];

  const outputs = null;

  const controls = [
    <canvas id={"canvas"} ref={canvasRef} width={canvasX} height={canvasY} />
  ];

  useAnimationFrame(() => {
    if (gl !== null && programInfo !== null && bufferInfo !== null) {
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

      var uniforms = {
        u_time: input.current[0],
        u_resolution: [gl.canvas.width, gl.canvas.height]
      };

      gl.useProgram(programInfo.program);

      twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
      twgl.setUniforms(programInfo, uniforms);
      twgl.drawBufferInfo(gl, bufferInfo);
    }
  });

  return (
    <Panel
      key={id}
      id={id}
      x={x}
      y={y}
      title={`Shader`}
      inputs={inputs}
      outputs={outputs}
      controls={controls}
    />
  );
}

// const gl = document.getElementById("c").getContext("webgl");
// const programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);

// const arrays = {
//   position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
// };
// const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

// function render(time) {
//   twgl.resizeCanvasToDisplaySize(gl.canvas);
//   gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

//   const uniforms = {
//     time: time * 0.001,
//     resolution: [gl.canvas.width, gl.canvas.height],
//   };

//   gl.useProgram(programInfo.program);
//   twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
//   twgl.setUniforms(programInfo, uniforms);
//   twgl.drawBufferInfo(gl, bufferInfo);

//   requestAnimationFrame(render);
// }
// requestAnimationFrame(render);
