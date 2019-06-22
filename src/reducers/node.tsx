export default class {
  static connect = (state: any, action: any) => {
    if (!state.connector) {
      /* Remove any node connected to the connector */
      state.connections[action.payload.id] = null;
      /* Remove the from line */
      state.connectionLines = state.connectionLines.filter((cl: any) => {
        return cl.from !== action.payload.id;
      });

      state.connector = {
        id: action.payload.id,
        x: action.payload.x,
        y: action.payload.y
      };
    } else {
      /* Remove the to line */
      state.connectionLines = state.connectionLines.filter((cl: any) => {
        return !(
          cl.to === action.payload.id && cl.index === action.payload.index
        );
      });
      state.connectionLines.push({
        from: state.connector.id,
        to: action.payload.id,
        x1: state.connector.x,
        y1: state.connector.y,
        x2: action.payload.x,
        y2: action.payload.y,
        index: action.payload.index
      });
      state.connections[state.connector.id] = [
        action.payload.id,
        action.payload.index
      ];
      state.inputs[action.payload.id][action.payload.index] =
        state.outputs[state.connector.id];
      state.connector = null;
    }

    return state;
  };
}
