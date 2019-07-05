import React, { useEffect, useState, useRef, useContext } from "react";
import { DispatchContext } from "../../Contexts/dispatch";
import { Panel } from "../../Components/panel";
import { Output } from "../../Components/output";

interface iJson {
  id: string;
  title?: string;
  x: number;
  y: number;
}

export default function Keyboard({ id, title, x, y }: iJson) {
  const { dispatch, state } = useContext(DispatchContext);
  const [keys, setKeys] = useState<Array<string>>([]);
  const [output, setOutput] = useState<string | object>({});
  const input = useRef([]);
  const panelref = useRef(null);

  const newkeyRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: any) => {
    console.log(e);
  };

  const handleKeyUp = (e: any) => {
    console.log(e);
  };

  useEffect(() => {
    dispatch({
      type: "panel/register",
      id: id,
      inputs: input.current
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: "recalculate",
      msg: "key",
      id: id,
      value: null
    });
  }, []);

  const updateKeys = (keyid: string, i: number) => {
    if (keys.indexOf(keyid) > -1) return;
    const tempKeys: any = [...keys];
    if (!keyid) {
      tempKeys.splice(i, 1);
    } else {
      tempKeys[i] = keyid;
    }

    setKeys(tempKeys);

    dispatch({
      type: "recalculate",
      msg: "uniforms",
      id: id,
      value: output
    });
  };

  const inputs = null;

  const outputs = [
    <Output
      id={id}
      key={`output-${id}-0`}
      direction={"out"}
      index={null}
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
              onInput={e => {
                if (newkeyRef && newkeyRef.current && newkeyRef.current.value) {
                  updateKeys(newkeyRef.current.value, i);
                }
              }}
            />
            <input type="text" name="pick" value={""} disabled />
          </div>
        );
      })}
      <div className={"uniforms"}>
        <input
          type="text"
          name="newpick"
          defaultValue={""}
          ref={newkeyRef}
          onKeyUp={e => {
            if (newkeyRef && newkeyRef.current && e.which === 13) {
              updateKeys(newkeyRef.current.value, keys.length);
              newkeyRef.current.value = "";
            }
          }}
          onBlur={e => {
            if (newkeyRef && newkeyRef.current && newkeyRef.current.value) {
              updateKeys(newkeyRef.current.value, keys.length);
              newkeyRef.current.value = "";
            }
          }}
        />
        <input type="text" name="pick" defaultValue={""} disabled />
      </div>
      <div
        tabIndex={0}
        style={{
          height: "100px",
          width: "100%",
          marginTop: "5px",
          backgroundColor: "rgba(255,255,255,0.1)"
        }}
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
