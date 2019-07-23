import React, { useCallback, useContext } from "react";
import { DispatchContext } from "../Contexts/dispatch";
import { pick } from "lodash";

import "./footer.css";

export function Footer() {
  const { state } = useContext(DispatchContext);

  const exportState = useCallback(() => {
    const exportData = pick(state, ["canvas", "connections"]);

    console.log(state);
    console.log(exportData);
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
      </ul>
    </footer>
  );
}
