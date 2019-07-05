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
  const [output, setOutput] = useState<{ [s: string]: any }>({});
  const [picks, setPicks] = useState<Array<string>>([]);
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
    const tempData: { [s: string]: string } = pick(input.current[0], picks);
    const out: { [s: string]: string } = {};
    picks.map((p: string) => {
      out[p] = tempData[p] || "not found";
    });
    setOutput(out);

    dispatch({
      type: "recalculate",
      msg: "uniforms",
      id: id,
      value: out
    });
  }, [input.current[0]]);

  const updatePick = (pickid: string, i: number) => {
    if (picks.indexOf(pickid) > -1) return;
    const tempPicks: any = [...picks];
    if (!pickid) {
      tempPicks.splice(i, 1);
    } else {
      tempPicks[i] = pickid;
    }

    setPicks(tempPicks);
    const tempData: { [s: string]: string } = pick(input.current[0], tempPicks);
    const out: { [s: string]: string } = {};
    tempPicks.map((p: string) => {
      out[p] = tempData[p] || `test-${p}`;
    });

    setOutput(out);

    dispatch({
      type: "recalculate",
      msg: "uniforms",
      id: id,
      value: out
    });
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
      type="array"
    />
  ];

  const controls = (
    <>
      {picks.map((value, i) => {
        return (
          <div className={"uniforms"} key={`uniform-${picks[i]}`}>
            <input
              type="text"
              name="pick"
              defaultValue={value}
              onInput={e => {
                if (
                  newpickRef &&
                  newpickRef.current &&
                  newpickRef.current.value
                ) {
                  updatePick(newpickRef.current.value, i);
                }
              }}
            />
            <input type="text" name="pick" value={output[picks[i]]} disabled />
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
        <input type="text" name="pick" defaultValue={""} disabled />
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
