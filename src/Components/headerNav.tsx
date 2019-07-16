import React from "react";

import { PRIMITIVES_KEYS } from "../Panels/primitives";
import { OPERATIONS_KEYS } from "../Panels/operations";
import { EVENTS_KEYS } from "../Panels/events";
import { OUTPUTS_KEYS } from "../Panels/outputs";
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

  const panelList = (keys: any) => {
    return (
      <ul>
        {keys.map((key: any) => {
          return (
            <li key={`panel-add-${key}`}>
              <button onClick={e => addPanelCallback(e, key)}>{key}</button>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <header className="nav">
      <h1>Copper</h1>
      <ul className="addPanel">
        <li>
          Primitives
          {panelList(PRIMITIVES_KEYS)}
        </li>
        <li>
          Operations
          {panelList(OPERATIONS_KEYS)}
        </li>
        <li>
          Events
          {panelList(EVENTS_KEYS)}
        </li>
        <li>
          Outputs
          {panelList(OUTPUTS_KEYS)}
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
