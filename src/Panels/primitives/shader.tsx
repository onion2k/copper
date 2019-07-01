import React, { useEffect, useState, useRef, useContext } from "react";
import * as twgl from "twgl.js";
import useAnimationFrame from "../../Hooks/useAnimationFrame";
import { DispatchContext } from "../../Contexts/dispatch";
import { Panel } from "../../Components/panel";
import { Input } from "../../Components/input";

interface iShader {
  id: string;
  title?: string;
  x: number;
  y: number;
  inputs?: Array<any>;
  defaults?: React.MutableRefObject<Array<any>>;
}

export default function Shader({ id, title, x, y, inputs, defaults }: iShader) {
  const { dispatch } = useContext(DispatchContext);

  const [gl, setGL] = useState<WebGLRenderingContext | null>(null);
  const [programInfo, setProgramInfo] = useState<twgl.ProgramInfo | null>(null);
  const [arrays, setArrays] = useState({
    position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0]
  });
  const [bufferInfo, setBufferInfo] = useState<twgl.BufferInfo | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasX = 700;
  const canvasY = 500;

  const input = defaults ? defaults : useRef(["", "", 0]);

  useEffect(() => {
    dispatch({
      type: "panel/register",
      id: id,
      inputs: input.current
    });
  }, [canvasRef]);

  useEffect(() => {
    if (input.current[0] !== "" && input.current[1] !== "") {
      if (canvasRef.current !== null) {
        const gl = canvasRef.current.getContext("webgl");
        if (gl !== null) {
          setGL(gl);
          setProgramInfo(
            twgl.createProgramInfo(gl, [
              input.current[0].toString(),
              input.current[1].toString()
            ])
          );
          setBufferInfo(twgl.createBufferInfoFromArrays(gl, arrays));
        }
      }
    }
  }, [canvasRef, input.current[0], input.current[1]]);

  if (!inputs) {
    inputs = [
      <Input
        key={`input-${id}-0`}
        id={id}
        direction={"in"}
        index={0}
        value={input.current[0]}
        title={"vs"}
      />,
      <Input
        key={`input-${id}-1`}
        id={id}
        direction={"in"}
        index={1}
        value={input.current[1]}
        title={"fs"}
      />,
      <Input
        key={`input-${id}-2`}
        id={id}
        direction={"in"}
        index={2}
        value={input.current[2]}
        title={"u_time"}
      />
    ];
  }

  const outputs = null;

  const controls = [
    <canvas
      id={"canvas"}
      key={"canvas-shader-0"}
      ref={canvasRef}
      width={canvasX}
      height={canvasY}
    />
  ];

  useAnimationFrame(() => {
    if (gl !== null && programInfo !== null && bufferInfo !== null) {
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

      var uniforms = {
        u_time: input.current[2],
        u_color: input.current[3],
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
      title={title || "Shader"}
      inputs={inputs}
      outputs={outputs}
      controls={controls}
      nopadding
      large
    />
  );
}