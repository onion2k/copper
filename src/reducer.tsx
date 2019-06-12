import panel from "./reducers/panel";

export function reducer(state: any, action: any) {
  const newState = { ...state };
  let connection;
  switch (action.type) {
    case "update":
      /**
       * This whole section needs thought - on every effect call in a panel the output value is updated, then a check is made to see if the output (based on the panel id) is connected, and the input value of a panel is updated as well.
       *
       * This all works and it's ~reasonably~ fast but how far it'll scale is unknown.
       */

      /**
       * This is assuming a single output for any given panel
       */
      newState.outputs[action.id] = action.value;

      /**
       * Update the input if there's a registered connection
       */
      connection = newState.connections[action.id];
      if (connection) {
        newState.inputs[connection.id][connection.index] = action.value;
      }

      return newState;
    case "connect":
      newState.connections[action.from] = {
        id: action.to,
        index: action.index
      };
      newState.connectionLines.push({ ...action });
      return newState;
    case "register":
      newState.inputs[action.id] = [];
      return newState;
      break;
    case "registerNode":
      const p = state.panels.find((panel: any) => {
        return action.node.id === panel.id;
      });
      newState.nodes.push(action.node);
      return newState;
      break;
    case "panelMove":
      return panel.move(newState, action);
    case "panelRegister":
      return panel.register(newState, action);
    default:
      throw new Error();
  }
}
