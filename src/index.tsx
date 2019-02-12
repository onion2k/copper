import React, { useState } from "react";
import { render } from "react-dom";
import { Const } from "./Nodes/const";
import { Value } from "./Nodes/value";
import { Math } from "./Nodes/math";
import { ConnectorContext } from "./Contexts/connector";

import "./styles.css";

function setOutput(output: any) {}

function App() {
  const [connector, setConnector] = useState(null);
  const [const0, setConst0] = useState(0);
  const [const1, setConst1] = useState(0);
  const [add1, setAdd1] = useState(0);
  const [const3, setConst3] = useState(0);
  const [add2, setAdd2] = useState(0);
  return (
    <ConnectorContext.Provider value={[connector, setConnector]}>
      <div className="Control">
        <Const x={10} y={10} output={setConst0} />
        <Const x={10} y={210} output={setConst1} />
        <Math
          x={360}
          y={95}
          input={[const0, const1]}
          output={setAdd1}
          op="add"
        />
        <Const x={10} y={410} output={setConst3} />
        <Math
          x={710}
          y={310}
          input={[add1, const3]}
          output={setAdd2}
          op="multiply"
        />
        <Value x={1060} y={210} input={[add2]} output={setOutput} />

        <svg viewBox="0 0 1424 1424" xmlns="http://www.w3.org/2000/svg">
          <line
            x1="325"
            y1="93"
            x2="375"
            y2="178"
            strokeWidth="1"
            stroke="black"
          />
        </svg>
      </div>
    </ConnectorContext.Provider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
