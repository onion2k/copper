import React, { useState } from "react";
import { render } from "react-dom";
import { Const } from "./const";
import { Value } from "./value";
import { Add } from "./add";

import "./styles.css";

function setOutput(output: any) {
  console.log(output);
}

function App() {
  const [const0, setConst0] = useState(0);
  const [const1, setConst1] = useState(0);
  const [add1, setAdd1] = useState(0);
  return (
    <div className="Control">
      <Const x={10} y={10} outputCallback={setConst0} />
      <Const x={10} y={210} outputCallback={setConst1} />
      <Add x={400} y={110} input={[const0, const1]} outputCallback={setAdd1} />
      <Value x={800} y={110} input={[add1]} outputCallback={setOutput} />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
