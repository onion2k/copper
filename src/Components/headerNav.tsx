import React from "react";
import SHADERS from "../Panels/shaders";

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
              <button onClick={() => addPanel("CONST")}>Const</button>
            </li>
            <li>
              <button onClick={() => addPanel("TIME")}>Time</button>
            </li>
            <li>
              <button onClick={() => addPanel("STRING")}>String</button>
            </li>
            <li>
              <button onClick={() => addPanel("COLOR")}>Color</button>
            </li>
            <li>
              <button onClick={() => addPanel("VALUE")}>Value</button>
            </li>
          </ul>
        </li>
        <li>
          Operations
          <ul>
            <li>
              <button onClick={() => addPanel("ARITHMATIC")}>Arithmatic</button>
            </li>
            <li>
              <button onClick={() => addPanel("UNIFORMS")}>Uniforms</button>
            </li>
            <li>
              <button onClick={() => addPanel("TRIG")}>Trigonometry</button>
            </li>
          </ul>
        </li>
        <li>
          Events
          <ul>
            <li>
              <button onClick={() => addPanel("EVENT_MousePosition")}>
                Mouse Position
              </button>
            </li>
            <li>
              <button onClick={() => addPanel("EVENT_Http")}>
                Http Request
              </button>
            </li>
          </ul>
        </li>
        <li>
          Outputs
          <ul>
            <li>
              <button onClick={() => addPanel("SHADER")}>GLSL Shader</button>
            </li>
            <li>
              <button onClick={() => addPanel("TEMPLATE")}>Template</button>
            </li>
          </ul>
        </li>
        <li>
          Shaders
          <ul>
            {Object.keys(SHADERS).map((shader: any) => {
              return (
                <li>
                  <button onClick={() => addPanel(shader)}>
                    {SHADERS[shader].title}
                  </button>
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    </header>
  );
}
