// action - payload - from:id, index, x, y (output), to: id, index, index, x, y (input)

export default class {
  static register = (state: any, action: any) => {
    console.log(action);
    return state;
  };

  static connect = (state: any, action: any) => {
    if (!state.connector) {
      /* Remove any node connected to the connector */
      if (!state.connections[action.payload.id])
        state.connections[action.payload.id] = [];

      state.connections[action.payload.id][action.payload.index] = null;

      /* Remove the from line */
      state.connectionLines = state.connectionLines.filter((cl: any) => {
        return !(
          cl.from === action.payload.id && cl.index === action.payload.index
        );
      });

      state.connector = {
        id: action.payload.id,
        index: action.payload.index,
        x: action.payload.x,
        y: action.payload.y,
        type: action.payload.type
      };
    } else {
      /* Remove the to line */
      if (
        state.connector.type !== action.payload.type &&
        action.payload.type !== "any"
      ) {
        state.connector = null;
        return state;
      }

      state.connectionLines = state.connectionLines.filter((cl: any) => {
        return !(
          cl.to === action.payload.id && cl.index === action.payload.index
        );
      });

      /* state connector is the output */
      /* payload is the input */
      state.connectionLines.push({
        from: state.connector.id,
        from_index: state.connector.index,
        to: action.payload.id,
        to_index: action.payload.index,
        x1: state.connector.x,
        y1: state.connector.y,
        x2: action.payload.x,
        y2: action.payload.y,
        index: action.payload.index
      });

      if (!state.connections[action.payload.id])
        state.connections[action.payload.id] = [];

      state.connections[state.connector.id][state.connector.index] = [
        action.payload.id,
        action.payload.index,
        state.connector.index
      ];

      /* update the input to the current output value */
      state.inputs[action.payload.id][action.payload.index] =
        state.outputs[state.connector.id][state.connector.index];

      console.log(state.connector, action.payload);
      // Unset the active connector
      state.connector = null;
    }

    return state;
  };

  static quickConnect = (state: any, action: any) => {
    /* state connector is the output */
    /* payload is the input */
    state.connectionLines.push({
      from: action.from,
      from_index: action.from_index,
      to: action.to,
      to_index: action.to_index,
      x1: action.x1,
      y1: action.y1,
      x2: action.x2,
      y2: action.y2,
      index: action.to_index
    });

    if (!state.connections[action.from]) state.connections[action.from] = [];
    state.connections[action.from][action.from_index] = [
      action.to,
      action.to_index,
      action.from_index
    ];

    /* update the input to the current output value */
    if (!state.inputs[action.to]) state.inputs[action.to] = [];
    if (!state.outputs[action.from]) state.outputs[action.from] = [];

    state.inputs[action.to][action.to_index] =
      state.outputs[action.from][action.from_index];

    return state;
  };

  static disconnect = (state: any, action: any) => {
    state.connector = null;
    return state;
  };
}
