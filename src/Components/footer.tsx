import React, { useCallback, useContext } from "react";
import { DispatchContext } from "../Contexts/dispatch";
import { pick } from "lodash";

import "./footer.css";

export function Footer() {
  const { state } = useContext(DispatchContext);

  const saveState = useCallback(() => {
    const exportData = pick(state, ["canvas", "connectome"]);
    localStorage.setItem("copper", JSON.stringify(exportData));
  }, [state]);

  const exportState = useCallback(() => {
    const exportData = pick(state, ["canvas", "connectome"]);
    console.log(JSON.stringify(exportData, null, 2));
  }, [state]);

  return (
    <footer className="footer">
      <ul>
        <li
          onClick={() => {
            exportState();
          }}
        >
          Log to JSON
        </li>
        <li
          onClick={() => {
            saveState();
          }}
        >
          Save
        </li>
      </ul>
    </footer>
  );
}
