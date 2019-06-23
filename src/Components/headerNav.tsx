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
              <button onClick={() => addPanel("constant")}>Const</button>
            </li>
            <li>
              <button onClick={() => addPanel("time")}>Time</button>
            </li>
            <li>
              <button onClick={() => addPanel("string")}>String</button>
            </li>
            <li>
              <button onClick={() => addPanel("color")}>Color</button>
            </li>
            <li>
              <button onClick={() => addPanel("value")}>Value</button>
            </li>
          </ul>
        </li>
        <li>
          Operations
          <ul>
            <li>
              <button onClick={() => addPanel("math")}>Math</button>
            </li>
            <li>
              <button onClick={() => addPanel("sin")}>Sin</button>
            </li>
          </ul>
        </li>
        <li>
          Events
          <ul>
            <li>
              <button onClick={() => addPanel("mousePosition")}>
                Mouse Position
              </button>
            </li>
          </ul>
        </li>
        <li>
          Complex Components
          <ul>
            <li>
              <button onClick={() => addPanel("shader")}>GLSL Shader</button>
            </li>
          </ul>
        </li>
      </ul>
    </header>
  );
}
