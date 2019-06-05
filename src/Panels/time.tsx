import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useContext
} from "react";
import { ConnectorContext } from "../Contexts/connector";
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
  const [
    connector,
    setConnector,
    connectConnector,
    registerNode,
    mouseX,
    mouseY,
    dispatch
  ] = useContext(ConnectorContext);
  const [value, setValue] = useState(0);
  const [pause, setPause] = useState(initPauseState);
  const [connect, setConnect] = useState(false);

  useEffect(() => {
    dispatch({
      type: "update",
      id: id,
      value: value
    });
  });

  useAnimationFrame(() => {
    if (!pause) {
      setValue(v => v + 0.01);
    }
  });

  const io = (
    <Output
      key={id}
      id={id}
      direction={"out"}
      index={0}
      value={value.toFixed(3)}
    />
  );

  const controls = (
    <button onClick={() => setPause(!pause)} style={{ width: "100%" }}>
      Pause
    </button>
  );

  return <Panel x={x} y={y} title={`Timer`} io={io} controls={controls} />;
}
