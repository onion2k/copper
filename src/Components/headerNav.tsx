import React from "react";
import SHADERS from "../Panels/shaders";
import "./headerNav.css";

interface iHeaderNav {
  addPanel: Function;
}

export function HeaderNav({ addPanel }: iHeaderNav) {
  const addPanelCallback = (
    event: React.MouseEvent<HTMLButtonElement>,
    type: string
  ) => {
    event.stopPropagation();
    addPanel(type);
  };

  return (
    <header className="nav">
      <h1>Copper</h1>
      <ul className="addPanel">
        <li>
          Primitives
          <ul>
            <li>
              <button onClick={e => addPanelCallback(e, "CONST")}>Const</button>
            </li>
            <li>
              <button onClick={e => addPanelCallback(e, "TIME")}>Time</button>
            </li>
            <li>
              <button onClick={e => addPanelCallback(e, "STRING")}>
                String
              </button>
            </li>
            <li>
              <button onClick={e => addPanelCallback(e, "COLOR")}>Color</button>
            </li>
            <li>
              <button onClick={e => addPanelCallback(e, "VALUE")}>Value</button>
            </li>
          </ul>
        </li>
        <li>
          Operations
          <ul>
            <li>
              <button onClick={e => addPanelCallback(e, "ARITHMATIC")}>
                Arithmatic
              </button>
            </li>
            <li>
              <button onClick={e => addPanelCallback(e, "JSON")}>Json</button>
            </li>
            <li>
              <button onClick={e => addPanelCallback(e, "TRIG")}>
                Trigonometry
              </button>
            </li>
            <li>
              <button onClick={e => addPanelCallback(e, "SPLIT")}>
                Split Vec2
              </button>
            </li>
          </ul>
        </li>
        <li>
          Events
          <ul>
            <li>
              <button onClick={e => addPanelCallback(e, "EVENT_MousePosition")}>
                Mouse Position
              </button>
            </li>
            <li>
              <button onClick={e => addPanelCallback(e, "EVENT_Http")}>
                Http Request
              </button>
            </li>
            <li>
              <button onClick={e => addPanelCallback(e, "EVENT_Keyboard")}>
                Keyboard
              </button>
            </li>
          </ul>
        </li>
        <li>
          Outputs
          <ul>
            <li>
              <button onClick={e => addPanelCallback(e, "SHADER")}>
                GLSL Shader
              </button>
            </li>
            <li>
              <button onClick={e => addPanelCallback(e, "TEMPLATE")}>
                Template
              </button>
            </li>
          </ul>
        </li>
        <li>
          Shaders
          <ul>
            {Object.keys(SHADERS).map((shader: any) => {
              return (
                <li key={`shader-add-${shader}`}>
                  <button onClick={e => addPanelCallback(e, shader)}>
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
