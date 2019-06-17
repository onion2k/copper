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

      /**
       * Update the input if there's a registered connection
       */

      // console.log(action.id, newState.inputs[newState.connections[action.id]]);

      // if (connection) {
      //   newState.inputs[connection.id][connection.index] = action.value;
      // }

      return newState;

    case "node/connect":
      const node = newState.inputs[action.payload.nodeId];

      console.log(action.payload.nodeId, node.x, node.y);

      if (!newState.connector) {
        newState.connector = {
          nodeId: node.nodeId,
          x: node.x,
          y: node.y
        };
      } else {
        // second half
      }

      return newState;

    case "node/register":
      console.log(action.payload.nodeId, action.payload.x, action.payload.y);
      newState.inputs[action.payload.nodeId] = action.payload;
      return newState;

    case "panel/move":
      return panel.move(newState, action);
    case "panel/register":
      return panel.register(newState, action);
    default:
      throw new Error();
  }
}
