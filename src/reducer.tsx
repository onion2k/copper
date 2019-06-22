import panel from "./reducers/panel";

export function reducer(state: any, action: any) {
  const newState = { ...state };
  switch (action.type) {
    case "recalculate":
      /**
       * This whole section needs thought - on every effect call in a panel the output value is updated, then a check is made to see if the output (based on the panel id) is connected, and the input value of a panel is updated as well.
       */

      /**
       * This is assuming a single output for any given panel
       */
      // newState.outputs[action.id] = action.value;
      // console.log(
      //   newState.outputs[action.id],
      //   newState.inputs[newState.outputs[action.id]]
      // );
      //
      newState.outputs[action.id] = action.value;

      if (newState.connections[action.id]) {
        const id = newState.connections[action.id][0];
        const index = newState.connections[action.id][1];
        newState.inputs[id][index] = action.value;
      }

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
          id: action.payload.id,
          x: action.payload.x,
          y: action.payload.y
        };
      } else {
        newState.connectionLines.push({
          from: newState.connector.id,
          to: action.payload.id,
          x1: newState.connector.x,
          y1: newState.connector.y,
          x2: action.payload.x,
          y2: action.payload.y
        });
        newState.connections[newState.connector.id] = [
          action.payload.id,
          action.payload.index
        ];
        newState.inputs[action.payload.id][action.payload.index] =
          newState.outputs[newState.connector.id];

        newState.connector = null;
      }

      return newState;

    case "panel/move":
      return panel.move(newState, action);
    case "panel/register":
      return panel.register(newState, action);
    default:
      throw new Error();
  }
}
