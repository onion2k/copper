import React from "react";

interface iHeaderNav {
  addPanel: Function;
}

export function HeaderNav({ addPanel }: iHeaderNav) {
  return (
    <header className="nav">
      <h1>Copper</h1>
      <ul className="addPanel">
        <li>
          Primitives
          <ul>
            <li>
              <button onClick={() => addPanel("constant")}>Add Const</button>
            </li>
            <li>
              <button onClick={() => addPanel("time")}>Add Time</button>
            </li>
            <li>
              <button onClick={() => addPanel("string")}>Add String</button>
            </li>
            <li>
              <button onClick={() => addPanel("color")}>Add Color</button>
            </li>
            <li>
              <button onClick={() => addPanel("value")}>Add Value</button>
            </li>
          </ul>
        </li>
        <li>
          Operations
          <ul>
            <li>
              <button onClick={() => addPanel("math")}>Add Math</button>
            </li>
            <li>
              <button onClick={() => addPanel("sin")}>Add Sin</button>
            </li>
          </ul>
        </li>
        <li>
          Complex Components
          <ul>
            <li>
              <button onClick={() => addPanel("shader")}>Add Shader</button>
            </li>
          </ul>
        </li>
      </ul>
    </header>
  );
}
