import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useContext
} from "react";
import { ConnectorContext } from "../Contexts/connector";
import { DispatchContext } from "../Contexts/dispatch";
import useAnimationFrame from "../Hooks/useAnimationFrame";
import { Panel } from "../Components/panel";
import { Output } from "../Components/output";

interface iTime {
  id: string;
  x: number;
  y: number;
  initPauseState: boolean;
  input?: any;
  output?: any;
}

export function Time({ id, x, y, initPauseState }: iTime) {
  const [connector, setConnector, connectConnector] = useContext(
    ConnectorContext
  );

  const dispatch = useContext(DispatchContext);

  const [value, setValue] = useState(0);
  const [pause, setPause] = useState(initPauseState);
  const [connect, setConnect] = useState(false);

  useEffect(() => {
    dispatch({
      type: "recalculate",
      id: id,
      value: value
    });
  }, [value]);

  useAnimationFrame(() => {
    if (!pause) {
      setValue(v => v + 0.01);
    }
  });

  const outputs = [
    <Output
      key={id}
      id={id}
      direction={"out"}
      index={0}
      value={value.toFixed(3)}
    />
  ];

  const controls = (
    <button onClick={() => setPause(!pause)} style={{ width: "100%" }}>
      Pause
    </button>
  );

  return (
    <Panel
      id={id}
      x={x}
      y={y}
      title={`Timer`}
      inputs={null}
      outputs={outputs}
      controls={controls}
    />
  );
}
