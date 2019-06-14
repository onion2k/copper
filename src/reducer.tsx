import panel from "./reducers/panel";

export function reducer(state: any, action: any) {
  const newState = { ...state };
  let connection;
  switch (action.type) {
    case "recalculate":
      /**
       * This whole section needs thought - on every effect call in a panel the output value is updated, then a check is made to see if the output (based on the panel id) is connected, and the input value of a panel is updated as well.
       */

      /**
       * This is assuming a single output for any given panel
       */
      // newState.outputs[action.id] = action.value;
      // newState.inputs[newState.connectionsNew[action.id]] = action.value;

      console.log(
        action.id,
        newState.connections[action.id],
        newState.inputs[newState.connections[action.id]]
      );

      /**
       * Update the input if there's a registered connection
       */

      // console.log(action.id, newState.inputs[newState.connections[action.id]]);

      // if (connection) {
      //   newState.inputs[connection.id][connection.index] = action.value;
      // }

      return newState;

    case "connector/connect":
      if (action.from === action.to) return newState;
      newState.connections[action.from] = action.to;
      newState.connectionLines.push({ ...action });
      return newState;

    case "connector/register":
      newState.inputs[action.id] = action.value;
      return newState;
      break;

    case "panel/move":
      return panel.move(newState, action);
    case "panel/register":
      return panel.register(newState, action);
    default:
      throw new Error();
  }
}
