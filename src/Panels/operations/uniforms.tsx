import React, { useEffect, useState, useRef, useContext } from "react";
import { DispatchContext } from "../../Contexts/dispatch";
import { Panel } from "../../Components/panel";
import { Input } from "../../Components/input";
import { Output } from "../../Components/output";

import { pick } from "lodash";

interface iArithmatic {
  id: string;
  title?: string;
  x: number;
  y: number;
}

export default function Arithmatic({ id, title, x, y }: iArithmatic) {
  const { dispatch, state } = useContext(DispatchContext);
  const [value, setValue] = useState({});
  const [output, setOutput] = useState({});
  const [picks, setPicks] = useState([]);
  const input = useRef([]);

  const newpickRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch({
      type: "panel/register",
      id: id,
      inputs: input.current
    });
  }, []);

  useEffect(() => {
    setOutput(pick(input.current[0], picks));
    dispatch({
      type: "recalculate",
      msg: "uniforms",
      id: id,
      value: pick(input.current[0], picks)
    });
  }, [input.current[0]]);

  const updatePick = (id: string, i: number) => {
    const tempPick: any = [...picks];
    tempPick[i] = id;
    setPicks(tempPick);
  };

  const inputs = [
    <Input
      id={id}
      key={`input-${id}-0`}
      direction={"in"}
      index={0}
      value={input.current[0]}
      title={"A"}
      type="array"
    />
  ];

  const outputs = [
    <Output
      id={id}
      key={`output-${id}-0`}
      direction={"out"}
      index={null}
      value={output}
      type="float"
    />
  ];

  const controls = (
    <>
      {picks.map((value, i) => {
        return (
          <div className={"uniforms"}>
            <input
              type="text"
              name="pick"
              defaultValue={value}
              onChange={e => updatePick(e.target.value, i)}
            />
            <input
              type="text"
              name="pick"
              defaultValue={output[picks[i]]}
              disabled
            />
          </div>
        );
      })}
      <div className={"uniforms"}>
        <input
          type="text"
          name="newpick"
          defaultValue={""}
          ref={newpickRef}
          onKeyUp={e => {
            if (newpickRef && newpickRef.current && e.which === 13) {
              updatePick(newpickRef.current.value, picks.length);
              newpickRef.current.value = "";
            }
          }}
          onBlur={e => {
            if (newpickRef && newpickRef.current && newpickRef.current.value) {
              updatePick(newpickRef.current.value, picks.length);
              newpickRef.current.value = "";
            }
          }}
        />
        <input type="text" name="pick" defaultValue={"data"} disabled />
      </div>
    </>
  );

  return (
    <Panel
      key={id}
      id={id}
      x={x}
      y={y}
      title={"Uniforms"}
      inputs={inputs}
      outputs={outputs}
      controls={controls}
    />
  );
}
