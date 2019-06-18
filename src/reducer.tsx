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
      // newState.inputs[newState.connections[action.id]] = action.value;

      // console.log(newState);

      /**
       * Update the input if there's a registered connection
       */

      // console.log(action.id, newState.inputs[newState.connections[action.id]]);

      // if (connection) {
      //   newState.inputs[connection.id][connection.index] = action.value;
      // }

      return newState;

    case "node/connect":
      if (!newState.connector) {
        newState.connector = {
          nodeId: action.payload.nodeId,
          x: action.payload.x,
          y: action.payload.y
        };
      } else {
        // second half
        console.log(action);
        newState.connectionLines.push({
          from: newState.connector.nodeId,
          to: action.payload.nodeId,
          x1: newState.connector.x,
          y1: newState.connector.y,
          x2: action.payload.x,
          y2: action.payload.y
        });
        newState.connector = null;
      }

      return newState;

    case "node/register":
      newState.nodes[action.payload.nodeId] = action.payload;
      return newState;

    case "panel/move":
      return panel.move(newState, action);
    case "panel/register":
      return panel.register(newState, action);
    default:
      throw new Error();
  }
}
