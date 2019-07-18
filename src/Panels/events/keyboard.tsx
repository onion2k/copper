import React, { useEffect, useState, useRef, useContext } from "react";
import iPanel from "../../Interfaces/panel";

import { DispatchContext } from "../../Contexts/dispatch";
import { Panel } from "../../Components/panel";
import { Output } from "../../Components/output";

import { has } from "lodash";

export default function Keyboard({ id, title, x, y }: iPanel) {
  const { dispatch } = useContext(DispatchContext);
  const [keys, setKeys] = useState<Array<string>>([]);
  const [output, setOutput] = useState<{ [s: string]: boolean }>({});
  const input = useRef([]);

  const newkeyRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: any) => {
    if (!e.repeat && has(output, e.key)) {
      const tempOutput: { [s: string]: boolean } = { ...output };
      tempOutput[e.key] = true;
      setOutput(tempOutput);
    }
  };

  const handleKeyUp = (e: any) => {
    if (!e.repeat && has(output, e.key)) {
      const tempOutput: { [s: string]: boolean } = { ...output };
      tempOutput[e.key] = false;
      setOutput(tempOutput);
    }
  };

  useEffect(() => {
    dispatch({
      type: "panel/register",
      id: id,
      inputs: input.current
    });
  }, [dispatch, id]);

  useEffect(() => {
    dispatch({
      type: "recalculate",
      msg: "key",
      id: id,
      value: [output]
    });
  }, [dispatch, id, output]);

  const updateKeys = (keyid: string, i: number) => {
    const tempKeys: any = [...keys];
    if (keyid === "Backspace") {
      tempKeys.splice(i, 1);
    } else {
      tempKeys[i] = keyid;
    }
    setKeys(tempKeys);

    const tempOutput = tempKeys.reduce(function(
      i: { [s: string]: boolean },
      k: string
    ) {
      i[k] = false;
      return i;
    },
    {});
    setOutput(tempOutput);
  };

  const inputs = null;

  const outputs = [
    <Output
      id={id}
      key={`output-${id}-0`}
      direction={"out"}
      index={0}
      value={"a"}
      type="array"
    />
  ];

  const controls = (
    <>
      {keys.map((value, i) => {
        return (
          <div className={"uniforms"} key={`uniform-${keys[i]}`}>
            <input
              type="text"
              name="pick"
              defaultValue={value}
              onKeyUp={e => {
                if (newkeyRef && newkeyRef.current) {
                  updateKeys(e.key, i);
                }
              }}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
            <input
              type="text"
              name="key"
              value={output[value].toString()}
              disabled
              className={output[value] ? "pressed" : ""}
            />
          </div>
        );
      })}
      <div className={"uniforms"}>
        <input
          type="text"
          name="newpick"
          placeholder={"Press a key"}
          defaultValue={""}
          ref={newkeyRef}
          onKeyUp={e => {
            if (newkeyRef && newkeyRef.current) {
              updateKeys(e.key, keys.length);
              newkeyRef.current.value = "";
            }
          }}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
        <input type="text" name="pick" defaultValue={""} disabled />
      </div>
      <div
        className="keyboard"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      />
    </>
  );

  return (
    <Panel
      key={id}
      id={id}
      x={x}
      y={y}
      title={"Keys"}
      inputs={inputs}
      outputs={outputs}
      controls={controls}
    />
  );
}
